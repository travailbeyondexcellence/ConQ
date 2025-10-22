package main

import (
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	sharedConfig "github.com/conq/backend/shared/config"
	"github.com/conq/backend/shared/utils"
	"google.golang.org/grpc"
)

func main() {
	serviceName := sharedConfig.GetEnv(sharedConfig.EnvServiceName, "content-service")
	grpcPort := sharedConfig.GetEnv(sharedConfig.EnvGRPCPort, "50053")

	// Initialize logger
	utils.InitLogger(serviceName)
	utils.Logger.Info().Msg("Starting " + serviceName)

	// Connect to MongoDB
	mongoClient, err := sharedConfig.ConnectMongo(sharedConfig.MongoConfig{
		URI:      sharedConfig.GetEnv(sharedConfig.EnvMongoURI, "mongodb://admin:password@localhost:27017"),
		Database: sharedConfig.GetEnv(sharedConfig.EnvMongoDatabase, "conq"),
		Timeout:  10 * time.Second,
	})
	if err != nil {
		utils.Logger.Fatal().Err(err).Msg("Failed to connect to MongoDB")
	}
	defer sharedConfig.DisconnectMongo(mongoClient)

	// Connect to NATS
	natsConn, err := sharedConfig.ConnectNATS(sharedConfig.NATSConfig{
		URL:           sharedConfig.GetEnv(sharedConfig.EnvNATSURL, "nats://localhost:4222"),
		MaxReconnects: 10,
		ReconnectWait: 2 * time.Second,
	})
	if err != nil {
		utils.Logger.Fatal().Err(err).Msg("Failed to connect to NATS")
	}
	defer sharedConfig.DisconnectNATS(natsConn)

	// Create gRPC server
	grpcServer := grpc.NewServer(
		grpc.ChainUnaryInterceptor(
			utils.RecoveryInterceptor(),
			utils.LoggingInterceptor(serviceName),
		),
	)

	// Register gRPC service here
	// pb.RegisterUserServiceServer(grpcServer, handler)

	// Start gRPC server
	lis, err := net.Listen("tcp", ":"+grpcPort)
	if err != nil {
		utils.Logger.Fatal().Err(err).Msg("Failed to listen")
	}

	go func() {
		utils.Logger.Info().Str("port", grpcPort).Msg(serviceName + " started")
		if err := grpcServer.Serve(lis); err != nil {
			utils.Logger.Fatal().Err(err).Msg("Failed to serve")
		}
	}()

	// Wait for interrupt
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	utils.Logger.Info().Msg("Shutting down " + serviceName)
	grpcServer.GracefulStop()
}
