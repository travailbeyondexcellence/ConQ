package config

import (
	"time"

	sharedConfig "github.com/conq/backend/shared/config"
)

type Config struct {
	GRPCPort     string
	ServiceName  string
	MongoURI     string
	MongoDBName  string
	NATSURL      string
	JWTSecret    string
	JWTExpiry    time.Duration
	Environment  string
}

func LoadConfig() *Config {
	return &Config{
		GRPCPort:     sharedConfig.GetEnv(sharedConfig.EnvGRPCPort, "50051"),
		ServiceName:  sharedConfig.GetEnv(sharedConfig.EnvServiceName, "auth-service"),
		MongoURI:     sharedConfig.GetEnv(sharedConfig.EnvMongoURI, "mongodb://admin:password@localhost:27017"),
		MongoDBName:  sharedConfig.GetEnv(sharedConfig.EnvMongoDatabase, "conq"),
		NATSURL:      sharedConfig.GetEnv(sharedConfig.EnvNATSURL, "nats://localhost:4222"),
		JWTSecret:    sharedConfig.GetEnv(sharedConfig.EnvJWTSecret, "your-secret-key-change-in-production"),
		JWTExpiry:    sharedConfig.GetEnvDuration(sharedConfig.EnvJWTExpiry, 24*time.Hour),
		Environment:  sharedConfig.GetEnv(sharedConfig.EnvEnvironment, "development"),
	}
}
