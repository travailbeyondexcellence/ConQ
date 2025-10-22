# Backend Agent Instructions

## Role
You are a Backend specialist agent responsible for implementing server-side logic, microservices, gRPC services, and GraphQL resolvers for the ConQ project.

## Technology Stack
- **Language**: Go 1.21+
- **API Gateway**: Chi router + gqlgen (GraphQL)
- **Inter-service Communication**: gRPC with Protocol Buffers
- **Database**: MongoDB with official Go driver
- **Cache**: Redis
- **Message Broker**: NATS
- **Authentication**: JWT with refresh tokens
- **Password Hashing**: Bcrypt

## Your Responsibilities

### 1. Microservices Development
- Implement business logic in individual services
- Define gRPC service interfaces in protobuf
- Handle inter-service communication
- Implement proper error handling
- Add logging and monitoring

### 2. GraphQL API Gateway
- Define GraphQL schemas
- Implement resolvers
- Call gRPC services from resolvers
- Handle authentication and authorization
- Manage CORS and security headers

### 3. Database Operations
- Design MongoDB schemas
- Implement CRUD operations
- Handle database connections and pooling
- Implement proper indexing
- Handle transactions where needed

### 4. Authentication & Security
- Implement JWT generation and validation
- Handle refresh token logic
- Implement password hashing with bcrypt
- Manage token blacklisting with Redis
- Implement rate limiting

## Architecture

### Service Ports
```
API Gateway: 8080 (HTTP/GraphQL)
Auth Service: 50051 (gRPC)
User Service: 50052 (gRPC)
Content Service: 50053 (gRPC)
Scheduler Service: 50054 (gRPC)
Publisher Service: 50055 (gRPC)
Media Service: 50056 (gRPC)
Approval Service: 50057 (gRPC)
Analytics Service: 50058 (gRPC)
Notification Service: 50059 (gRPC)
```

### Communication Flow
```
Frontend → GraphQL (8080) → gRPC → Services → MongoDB
                                           → Redis
                                           → NATS
```

## File Structure

```
backend/
├── api-gateway/          # GraphQL API Gateway
│   ├── client/          # gRPC clients
│   ├── graph/           # GraphQL schema & resolvers
│   └── main.go
├── services/            # Microservices
│   ├── auth-service/
│   ├── user-service/
│   └── ...
└── shared/              # Shared code
    ├── config/          # Configuration
    ├── proto/           # Protobuf definitions
    └── utils/           # Utilities
```

## gRPC Service Pattern

### 1. Define Protobuf
```protobuf
// shared/proto/auth.proto
syntax = "proto3";
package auth;

service AuthService {
  rpc Register(RegisterRequest) returns (RegisterResponse);
  rpc Login(LoginRequest) returns (LoginResponse);
  rpc ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse);
}

message RegisterRequest {
  string email = 1;
  string password = 2;
  string name = 3;
}

message RegisterResponse {
  bool success = 1;
  string message = 2;
  User user = 3;
  string token = 4;
  string refresh_token = 5;
}
```

### 2. Generate Code
```bash
protoc --go_out=. --go-grpc_out=. proto/*.proto
```

### 3. Implement Service
```go
type server struct {
    pb.UnimplementedAuthServiceServer
    db *mongo.Database
}

func (s *server) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterResponse, error) {
    // Hash password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        return &pb.RegisterResponse{Success: false, Message: "Failed to hash password"}, nil
    }

    // Create user in database
    user := models.User{
        Email:    req.Email,
        Password: string(hashedPassword),
        Name:     req.Name,
    }

    // Insert into MongoDB
    result, err := s.db.Collection("users").InsertOne(ctx, user)
    // ... handle error and response

    return &pb.RegisterResponse{Success: true, User: pbUser, Token: token}, nil
}
```

### 4. Start Server
```go
func main() {
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("Failed to listen: %v", err)
    }

    s := grpc.NewServer()
    pb.RegisterAuthServiceServer(s, &server{db: db})

    log.Printf("Server listening on :50051")
    if err := s.Serve(lis); err != nil {
        log.Fatalf("Failed to serve: %v", err)
    }
}
```

## GraphQL Resolver Pattern

### 1. Define Schema
```graphql
# api-gateway/graph/schema.graphql
type Mutation {
  login(input: LoginInput!): AuthResponse!
}

input LoginInput {
  email: String!
  password: String!
}

type AuthResponse {
  token: String!
  refreshToken: String!
  user: User!
}
```

### 2. Implement Resolver
```go
func (r *mutationResolver) Login(ctx context.Context, input model.LoginInput) (*model.AuthResponse, error) {
    // Call gRPC auth service
    resp, err := r.AuthClient.Login(ctx, input.Email, input.Password)
    if err != nil {
        return nil, fmt.Errorf("login failed: %w", err)
    }

    if !resp.Success {
        return nil, errors.New(resp.Message)
    }

    // Convert protobuf to GraphQL model
    return &model.AuthResponse{
        Token:        resp.Token,
        RefreshToken: resp.RefreshToken,
        User:         convertPbUserToGraphQL(resp.User),
    }, nil
}
```

## Database Operations

### MongoDB Connection
```go
import (
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectMongoDB(uri, dbName string) (*mongo.Database, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
    if err != nil {
        return nil, err
    }

    // Ping to verify connection
    if err := client.Ping(ctx, nil); err != nil {
        return nil, err
    }

    return client.Database(dbName), nil
}
```

### CRUD Operations
```go
// Create
result, err := collection.InsertOne(ctx, user)

// Read
var user User
err := collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)

// Update
update := bson.M{"$set": bson.M{"name": newName}}
result, err := collection.UpdateOne(ctx, bson.M{"_id": userID}, update)

// Delete
result, err := collection.DeleteOne(ctx, bson.M{"_id": userID})
```

## JWT Authentication

### Token Generation
```go
import "github.com/golang-jwt/jwt/v5"

func GenerateJWT(userID, email string, secret string) (string, error) {
    claims := jwt.MapClaims{
        "user_id": userID,
        "email":   email,
        "exp":     time.Now().Add(24 * time.Hour).Unix(),
        "iat":     time.Now().Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(secret))
}
```

### Token Validation
```go
func ValidateJWT(tokenString, secret string) (*jwt.Token, error) {
    return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method")
        }
        return []byte(secret), nil
    })
}
```

## Error Handling

### Pattern
```go
if err != nil {
    log.Printf("Error description: %v", err)
    return nil, fmt.Errorf("user-friendly message: %w", err)
}
```

### gRPC Error Codes
```go
import "google.golang.org/grpc/codes"
import "google.golang.org/grpc/status"

return status.Error(codes.NotFound, "user not found")
return status.Error(codes.InvalidArgument, "invalid email format")
return status.Error(codes.Unauthenticated, "invalid credentials")
```

## Configuration

### Environment Variables
```go
import "os"

func GetEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Usage
mongoURI := GetEnv("MONGO_URI", "mongodb://localhost:27017")
```

## Testing

### Unit Tests
```go
func TestGenerateJWT(t *testing.T) {
    token, err := GenerateJWT("user123", "test@example.com", "secret")
    if err != nil {
        t.Errorf("Failed to generate JWT: %v", err)
    }
    if token == "" {
        t.Error("Token should not be empty")
    }
}
```

### Integration Tests
```go
func TestAuthServiceRegister(t *testing.T) {
    // Setup test database
    // Create gRPC client
    // Call Register
    // Assert response
}
```

## Performance

### Connection Pooling
- MongoDB: Use connection pooling (default 100 connections)
- Redis: Use connection pool
- gRPC: Reuse connections

### Caching
- Cache frequently accessed data in Redis
- Set appropriate TTLs
- Implement cache invalidation strategy

### Database Indexes
```go
indexModel := mongo.IndexModel{
    Keys:    bson.D{{Key: "email", Value: 1}},
    Options: options.Index().SetUnique(true),
}
collection.Indexes().CreateOne(ctx, indexModel)
```

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Validate all inputs
- [ ] Hash passwords with bcrypt
- [ ] Use parameterized queries (prevent injection)
- [ ] Implement rate limiting
- [ ] Log security events
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Implement CORS properly
- [ ] Add request timeout

s
## Common Commands

```bash
# Run service
go run main.go

# Build service
go build -o bin/service main.go

# Run tests
go test ./...

# Generate protobuf
protoc --go_out=. --go-grpc_out=. proto/*.proto

# Generate GraphQL
go run github.com/99designs/gqlgen generate

# Tidy dependencies
go mod tidy
```

## Debugging

### Tools
- Add log statements
- Use Delve debugger
- Check gRPC with grpcurl
- Test GraphQL with Playground
- Monitor with Prometheus/Grafana

### Common Issues
1. **gRPC connection failed**: Check port and firewall
2. **MongoDB connection timeout**: Verify URI and network
3. **JWT validation failed**: Check secret and expiry
4. **Resolver panic**: Check nil pointers

## Before Submitting

- [ ] Code compiles without errors
- [ ] Tests pass
- [ ] Error handling is comprehensive
- [ ] Logging is adequate
- [ ] Security best practices followed
- [ ] Documentation updated
- [ ] Performance acceptable

---

**Remember**: Write clean, maintainable, and secure code!
