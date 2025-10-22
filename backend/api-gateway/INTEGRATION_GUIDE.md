# GraphQL Resolver Integration Guide

This guide explains how to integrate the GraphQL resolvers with the gRPC auth service in your main.go.

## Setup

### 1. Initialize the Auth Client

Update your `main.go` to initialize the auth client and wire it to the GraphQL resolver:

```go
package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"

	"github.com/conq/backend/api-gateway/client"
	"github.com/conq/backend/api-gateway/graph"
	"github.com/conq/backend/api-gateway/graph/generated"
)

func main() {
	// Auth service address (should be configurable via environment variable)
	authServiceAddr := os.Getenv("AUTH_SERVICE_ADDR")
	if authServiceAddr == "" {
		authServiceAddr = "localhost:50051"
	}

	// Initialize the gRPC auth client
	authClient, err := client.NewAuthClient(authServiceAddr)
	if err != nil {
		log.Fatalf("Failed to create auth client: %v", err)
	}
	defer authClient.Close()

	// Initialize the GraphQL resolver with the auth client
	resolver := &graph.Resolver{
		AuthClient: authClient,
	}

	// Create GraphQL server
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{
		Resolvers: resolver,
	}))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

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
	handler := corsHandler.Handler(r)

	// Routes
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ConQ API Gateway"))
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
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal(err)
	}
}
```

## Environment Variables

- `PORT`: API Gateway port (default: 8080)
- `AUTH_SERVICE_ADDR`: Address of the gRPC auth service (default: localhost:50051)

## Testing the Resolvers

### 1. Start the Auth Service

Make sure your gRPC auth service is running on port 50051.

### 2. Start the API Gateway

```bash
go run main.go
```

### 3. Access GraphQL Playground

Open your browser to: http://localhost:8080/playground

### 4. Test Queries and Mutations

#### Health Check
```graphql
query {
  health
}
```

#### Register
```graphql
mutation {
  register(input: {
    name: "John Doe"
    email: "john@example.com"
    password: "securePassword123"
  }) {
    token
    refreshToken
    user {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
}
```

#### Login
```graphql
mutation {
  login(input: {
    email: "john@example.com"
    password: "securePassword123"
  }) {
    token
    refreshToken
    user {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
}
```

#### Validate Token
```graphql
query {
  validateToken(token: "your-jwt-token-here") {
    valid
    message
    user {
      id
      name
      email
    }
  }
}
```

## Implementation Details

### Auth Client (`/home/zenith/Desktop/Code/ConQ/backend/api-gateway/client/auth_client.go`)

The auth client provides a wrapper around the gRPC auth service with:
- Connection management with 10-second timeout
- Context-aware RPC calls with 5-second timeouts
- Proper error handling and wrapping
- Methods for: Register, Login, ValidateToken, RefreshToken

### Resolvers (`/home/zenith/Desktop/Code/ConQ/backend/api-gateway/graph/schema.resolvers.go`)

Implemented resolvers:
- **Register**: Calls auth service Register RPC, validates response, converts protobuf User to GraphQL User
- **Login**: Calls auth service Login RPC, validates response, converts protobuf User to GraphQL User
- **ValidateToken**: Calls auth service ValidateToken RPC, returns validation status
- **Health**: Simple health check returning "OK"

### Resolver Dependency Injection (`/home/zenith/Desktop/Code/ConQ/backend/api-gateway/graph/resolver.go`)

The Resolver struct now includes the AuthClient for dependency injection:
```go
type Resolver struct {
    AuthClient *client.AuthClient
}
```

## Error Handling

All resolvers implement proper error handling:
- gRPC errors are wrapped with context
- Auth service response validation (checking `success` field)
- Descriptive error messages returned to GraphQL clients

## Data Conversion

Protobuf User messages are converted to GraphQL User models:
- Unix timestamps (int64) → Go time.Time
- Protobuf field names → GraphQL field names
- Proper handling of optional fields

## Security Notes

1. **Insecure Credentials**: Currently using `grpc.WithTransportCredentials(insecure.NewCredentials())` for development. In production, use TLS.

2. **Token Security**: JWT tokens should be transmitted securely and stored safely on the client.

3. **Context Timeouts**: All RPC calls have 5-second timeouts to prevent hanging requests.

## Next Steps

Additional resolvers to implement:
- RefreshToken
- ForgotPassword
- ResetPassword
- ChangePassword
- VerifyEmail
- ResendVerification
- Me (current user)
- Logout

These follow the same pattern as the implemented resolvers.
