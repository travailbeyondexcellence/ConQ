package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/conq/backend/api-gateway/client"
	"github.com/conq/backend/api-gateway/graph"
	"github.com/conq/backend/api-gateway/graph/generated"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Get auth service address from env or use default
	authServiceAddr := os.Getenv("AUTH_SERVICE_ADDR")
	if authServiceAddr == "" {
		authServiceAddr = "localhost:50051"
	}

	// Initialize gRPC clients
	log.Printf("Connecting to auth service at %s", authServiceAddr)
	authClient, err := client.NewAuthClient(authServiceAddr)
	if err != nil {
		log.Fatalf("Failed to create auth client: %v", err)
	}
	defer authClient.Close()

	log.Println("Successfully connected to auth service")

	// Create GraphQL resolver with dependencies
	resolver := &graph.Resolver{
		AuthClient: authClient,
	}

	// Create GraphQL server
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{
		Resolvers: resolver,
	}))

	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)

	// CORS configuration
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:3001"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	// Apply CORS
	httpHandler := corsHandler.Handler(r)

	// Routes
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Conq API Gateway with GraphQL"))
	})

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"healthy"}`))
	})

	// GraphQL endpoints
	r.Handle("/graphql", srv)
	r.Handle("/playground", playground.Handler("GraphQL Playground", "/graphql"))

	log.Printf("API Gateway starting on port %s", port)
	log.Printf("GraphQL Playground: http://localhost:%s/playground", port)
	log.Printf("GraphQL Endpoint: http://localhost:%s/graphql", port)

	if err := http.ListenAndServe(":"+port, httpHandler); err != nil {
		log.Fatal(err)
	}
}
