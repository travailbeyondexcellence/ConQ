package config

import (
	"os"
	"strconv"
	"time"
)

// GetEnv gets environment variable with default value
func GetEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// GetEnvInt gets environment variable as integer with default
func GetEnvInt(key string, defaultValue int) int {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}

	intValue, err := strconv.Atoi(value)
	if err != nil {
		return defaultValue
	}

	return intValue
}

// GetEnvBool gets environment variable as boolean with default
func GetEnvBool(key string, defaultValue bool) bool {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}

	boolValue, err := strconv.ParseBool(value)
	if err != nil {
		return defaultValue
	}

	return boolValue
}

// GetEnvDuration gets environment variable as duration with default
func GetEnvDuration(key string, defaultValue time.Duration) time.Duration {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}

	duration, err := time.ParseDuration(value)
	if err != nil {
		return defaultValue
	}

	return duration
}

// Common environment variable keys
const (
	EnvGRPCPort     = "GRPC_PORT"
	EnvHTTPPort     = "HTTP_PORT"
	EnvServiceName  = "SERVICE_NAME"
	EnvEnvironment  = "ENV"
	EnvLogLevel     = "LOG_LEVEL"

	// MongoDB
	EnvMongoURI      = "MONGO_URI"
	EnvMongoDatabase = "DB_NAME"

	// Redis
	EnvRedisAddress  = "REDIS_URI"
	EnvRedisPassword = "REDIS_PASSWORD"
	EnvRedisDB       = "REDIS_DB"

	// NATS
	EnvNATSURL = "NATS_URL"

	// JWT
	EnvJWTSecret = "JWT_SECRET"
	EnvJWTExpiry = "JWT_EXPIRY"

	// MinIO
	EnvMinIOEndpoint  = "MINIO_ENDPOINT"
	EnvMinIOAccessKey = "MINIO_ACCESS_KEY"
	EnvMinIOSecretKey = "MINIO_SECRET_KEY"
)
