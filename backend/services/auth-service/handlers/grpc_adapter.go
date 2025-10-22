package handlers

import (
	"context"

	"github.com/conq/backend/services/auth-service/models"
	pb "github.com/conq/backend/shared/proto"
)

// GRPCAuthHandler adapts AuthHandler to implement the proto AuthServiceServer interface
type GRPCAuthHandler struct {
	pb.UnimplementedAuthServiceServer
	handler *AuthHandler
}

// NewGRPCAuthHandler creates a new gRPC auth handler
func NewGRPCAuthHandler(handler *AuthHandler) *GRPCAuthHandler {
	return &GRPCAuthHandler{
		handler: handler,
	}
}

// Register implements proto AuthServiceServer
func (h *GRPCAuthHandler) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.AuthResponse, error) {
	// Convert proto request to internal model
	internalReq := &models.RegisterRequest{
		Email:    req.Email,
		Password: req.Password,
		Name:     req.Name,
	}

	// Call internal handler
	internalResp, err := h.handler.Register(ctx, internalReq)
	if err != nil {
		return nil, err
	}

	// Convert internal response to proto
	protoResp := &pb.AuthResponse{
		Success:      internalResp.Success,
		Message:      internalResp.Message,
		AccessToken:  internalResp.AccessToken,
		RefreshToken: internalResp.RefreshToken,
	}

	// Convert user if present
	if internalResp.User != nil {
		protoResp.User = &pb.User{
			Id:    internalResp.User.ID.Hex(),
			Email: internalResp.User.Email,
			Name:  internalResp.User.Name,
		}
	}

	return protoResp, nil
}

// Login implements proto AuthServiceServer
func (h *GRPCAuthHandler) Login(ctx context.Context, req *pb.LoginRequest) (*pb.AuthResponse, error) {
	// Convert proto request to internal model
	internalReq := &models.LoginRequest{
		Email:    req.Email,
		Password: req.Password,
	}

	// Call internal handler
	internalResp, err := h.handler.Login(ctx, internalReq)
	if err != nil {
		return nil, err
	}

	// Convert internal response to proto
	protoResp := &pb.AuthResponse{
		Success:      internalResp.Success,
		Message:      internalResp.Message,
		AccessToken:  internalResp.AccessToken,
		RefreshToken: internalResp.RefreshToken,
	}

	// Convert user if present
	if internalResp.User != nil {
		protoResp.User = &pb.User{
			Id:    internalResp.User.ID.Hex(),
			Email: internalResp.User.Email,
			Name:  internalResp.User.Name,
		}
	}

	return protoResp, nil
}

// ValidateToken implements proto AuthServiceServer
func (h *GRPCAuthHandler) ValidateToken(ctx context.Context, req *pb.ValidateTokenRequest) (*pb.ValidateTokenResponse, error) {
	// Call internal handler
	userID, err := h.handler.ValidateToken(ctx, req.Token)
	if err != nil {
		return &pb.ValidateTokenResponse{
			Valid:   false,
			Message: err.Error(),
		}, nil
	}

	return &pb.ValidateTokenResponse{
		Valid:  true,
		UserId: userID,
	}, nil
}

// RefreshToken implements proto AuthServiceServer
func (h *GRPCAuthHandler) RefreshToken(ctx context.Context, req *pb.RefreshTokenRequest) (*pb.AuthResponse, error) {
	// Call service layer directly since handler doesn't have this method
	// We'll need to add this method to the AuthHandler later
	// For now, return unimplemented error
	return nil, nil
}
