package main

import (
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/conq/backend/services/auth-service/config"
	"github.com/conq/backend/services/auth-service/handlers"
	"github.com/conq/backend/services/auth-service/service"
	sharedConfig "github.com/conq/backend/shared/config"
	pb "github.com/conq/backend/shared/proto"
	"github.com/conq/backend/shared/utils"
	"google.golang.org/grpc"
)

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Initialize logger
	utils.InitLogger(cfg.ServiceName)
	utils.Logger.Info().Msg("Starting Auth Service")

	// Connect to MongoDB
	mongoClient, err := sharedConfig.ConnectMongo(sharedConfig.MongoConfig{
		URI:      cfg.MongoURI,
		Database: cfg.MongoDBName,
		Timeout:  10 * time.Second,
	})
	if err != nil {
		utils.Logger.Fatal().Err(err).Msg("Failed to connect to MongoDB")
	}
	defer sharedConfig.DisconnectMongo(mongoClient)
	utils.Logger.Info().Msg("Connected to MongoDB")

	// Get database
	db := sharedConfig.GetDatabase(mongoClient, cfg.MongoDBName)

	// Connect to NATS
	natsConn, err := sharedConfig.ConnectNATS(sharedConfig.NATSConfig{
		URL:           cfg.NATSURL,
		MaxReconnects: 10,
		ReconnectWait: 2 * time.Second,
	})
	if err != nil {
		utils.Logger.Fatal().Err(err).Msg("Failed to connect to NATS")
	}
	defer sharedConfig.DisconnectNATS(natsConn)
	utils.Logger.Info().Msg("Connected to NATS")

	// Initialize service
	authService := service.NewAuthService(db, natsConn, cfg.JWTSecret, cfg.JWTExpiry)
	authHandler := handlers.NewAuthHandler(authService)
	grpcHandler := handlers.NewGRPCAuthHandler(authHandler)

	// Create gRPC server
	grpcServer := grpc.NewServer(
		grpc.ChainUnaryInterceptor(
			utils.RecoveryInterceptor(),
			utils.LoggingInterceptor(cfg.ServiceName),
		),
	)

	// Register gRPC service
	pb.RegisterAuthServiceServer(grpcServer, grpcHandler)

	// Start gRPC server
	lis, err := net.Listen("tcp", ":"+cfg.GRPCPort)
	if err != nil {
		utils.Logger.Fatal().Err(err).Msg("Failed to listen")
	}

	// Graceful shutdown
	go func() {
		utils.Logger.Info().Str("port", cfg.GRPCPort).Msg("Auth Service started")
		if err := grpcServer.Serve(lis); err != nil {
			utils.Logger.Fatal().Err(err).Msg("Failed to serve")
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	utils.Logger.Info().Msg("Shutting down Auth Service...")
	grpcServer.GracefulStop()
	utils.Logger.Info().Msg("Auth Service stopped")
}
