package service

import (
	"context"
	"errors"
	"time"

	"github.com/conq/backend/services/auth-service/models"
	"github.com/conq/backend/services/auth-service/repository"
	"github.com/golang-jwt/jwt/v5"
	"github.com/nats-io/nats.go"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepo  *repository.UserRepository
	natsConn  *nats.Conn
	jwtSecret string
	jwtExpiry time.Duration
}

func NewAuthService(db *mongo.Database, natsConn *nats.Conn, jwtSecret string, jwtExpiry time.Duration) *AuthService {
	return &AuthService{
		userRepo:  repository.NewUserRepository(db),
		natsConn:  natsConn,
		jwtSecret: jwtSecret,
		jwtExpiry: jwtExpiry,
	}
}

// Register creates a new user account
func (s *AuthService) Register(ctx context.Context, req *models.RegisterRequest) (*models.AuthResponse, error) {
	// Check if user already exists
	exists, err := s.userRepo.UserExists(ctx, req.Email)
	if err != nil {
		return nil, err
	}
	if exists {
		return &models.AuthResponse{
			Success: false,
			Message: "User already exists",
		}, nil
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// Create user
	user := &models.User{
		Email:        req.Email,
		PasswordHash: string(hashedPassword),
		Name:         req.Name,
		Role:         "user",
	}

	err = s.userRepo.CreateUser(ctx, user)
	if err != nil {
		return nil, err
	}

	// Generate tokens
	accessToken, err := s.generateToken(user.ID.Hex(), user.Email)
	if err != nil {
		return nil, err
	}

	// Publish event
	s.natsConn.Publish("auth.user.registered", []byte(user.ID.Hex()))

	return &models.AuthResponse{
		Success:     true,
		Message:     "User registered successfully",
		AccessToken: accessToken,
		User:        user,
	}, nil
}

// Login authenticates a user
func (s *AuthService) Login(ctx context.Context, req *models.LoginRequest) (*models.AuthResponse, error) {
	// Find user
	user, err := s.userRepo.GetUserByEmail(ctx, req.Email)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return &models.AuthResponse{
				Success: false,
				Message: "Invalid credentials",
			}, nil
		}
		return nil, err
	}

	// Verify password
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password))
	if err != nil {
		return &models.AuthResponse{
			Success: false,
			Message: "Invalid credentials",
		}, nil
	}

	// Generate tokens
	accessToken, err := s.generateToken(user.ID.Hex(), user.Email)
	if err != nil {
		return nil, err
	}

	// Publish event
	s.natsConn.Publish("auth.user.login", []byte(user.ID.Hex()))

	return &models.AuthResponse{
		Success:     true,
		Message:     "Login successful",
		AccessToken: accessToken,
		User:        user,
	}, nil
}

// ValidateToken validates a JWT token
func (s *AuthService) ValidateToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(s.jwtSecret), nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID := claims["user_id"].(string)
		return userID, nil
	}

	return "", errors.New("invalid token")
}

// generateToken creates a JWT token
func (s *AuthService) generateToken(userID, email string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"exp":     time.Now().Add(s.jwtExpiry).Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.jwtSecret))
}
