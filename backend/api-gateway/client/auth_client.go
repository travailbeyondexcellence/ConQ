package client

import (
	"context"
	"fmt"
	"time"

	pb "github.com/conq/backend/shared/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// AuthClient wraps the gRPC auth service client
type AuthClient struct {
	client pb.AuthServiceClient
	conn   *grpc.ClientConn
}

// NewAuthClient creates a new auth service client
func NewAuthClient(address string) (*AuthClient, error) {
	// Set up connection with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Create connection options
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	}

	// Dial the auth service
	conn, err := grpc.DialContext(ctx, address, opts...)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to auth service at %s: %w", address, err)
	}

	// Create the client
	client := pb.NewAuthServiceClient(conn)

	return &AuthClient{
		client: client,
		conn:   conn,
	}, nil
}

// Register calls the Register RPC on the auth service
func (c *AuthClient) Register(ctx context.Context, email, password, name string) (*pb.AuthResponse, error) {
	// Add timeout to context if not already present
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	req := &pb.RegisterRequest{
		Email:    email,
		Password: password,
		Name:     name,
	}

	resp, err := c.client.Register(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("register RPC failed: %w", err)
	}

	return resp, nil
}

// Login calls the Login RPC on the auth service
func (c *AuthClient) Login(ctx context.Context, email, password string) (*pb.AuthResponse, error) {
	// Add timeout to context if not already present
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	req := &pb.LoginRequest{
		Email:    email,
		Password: password,
	}

	resp, err := c.client.Login(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("login RPC failed: %w", err)
	}

	return resp, nil
}

// ValidateToken calls the ValidateToken RPC on the auth service
func (c *AuthClient) ValidateToken(ctx context.Context, token string) (*pb.ValidateTokenResponse, error) {
	// Add timeout to context if not already present
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	req := &pb.ValidateTokenRequest{
		Token: token,
	}

	resp, err := c.client.ValidateToken(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("validate token RPC failed: %w", err)
	}

	return resp, nil
}

// RefreshToken calls the RefreshToken RPC on the auth service
func (c *AuthClient) RefreshToken(ctx context.Context, refreshToken string) (*pb.AuthResponse, error) {
	// Add timeout to context if not already present
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	req := &pb.RefreshTokenRequest{
		RefreshToken: refreshToken,
	}

	resp, err := c.client.RefreshToken(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("refresh token RPC failed: %w", err)
	}

	return resp, nil
}

// Close closes the gRPC connection
func (c *AuthClient) Close() error {
	if c.conn != nil {
		return c.conn.Close()
	}
	return nil
}
