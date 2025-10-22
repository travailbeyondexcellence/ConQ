package utils

import (
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Common response helpers

// SuccessResponse creates a success status
func SuccessResponse(message string) error {
	return status.Error(codes.OK, message)
}

// ErrorResponse creates an error status
func ErrorResponse(code codes.Code, message string) error {
	return status.Error(code, message)
}

// NotFoundError returns not found error
func NotFoundError(resource string) error {
	return status.Errorf(codes.NotFound, "%s not found", resource)
}

// AlreadyExistsError returns already exists error
func AlreadyExistsError(resource string) error {
	return status.Errorf(codes.AlreadyExists, "%s already exists", resource)
}

// InvalidArgumentError returns invalid argument error
func InvalidArgumentError(message string) error {
	return status.Error(codes.InvalidArgument, message)
}

// InternalError returns internal server error
func InternalError(message string) error {
	return status.Error(codes.Internal, message)
}

// UnauthenticatedError returns unauthenticated error
func UnauthenticatedError(message string) error {
	return status.Error(codes.Unauthenticated, message)
}

// PermissionDeniedError returns permission denied error
func PermissionDeniedError(message string) error {
	return status.Error(codes.PermissionDenied, message)
}
