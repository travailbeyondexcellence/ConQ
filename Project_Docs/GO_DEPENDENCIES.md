# Complete Go Dependencies Reference

This document lists all required Go packages for each microservice in the Conq backend.

## 🔧 Required Go Modules for Each Service

### 1. API Gateway - `backend/api-gateway/go.mod`

```go
module github.com/conq/backend/api-gateway

go 1.21

require (
    github.com/99designs/gqlgen v0.17.45
    github.com/go-chi/chi/v5 v5.0.12
    github.com/nats-io/nats.go v1.33.0
    github.com/rs/cors v1.10.1
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 2. Auth Service - `backend/services/auth-service/go.mod`

```go
module github.com/conq/backend/services/auth-service

go 1.21

require (
    github.com/golang-jwt/jwt/v5 v5.2.0
    github.com/nats-io/nats.go v1.33.0
    go.mongodb.org/mongo-driver v1.14.0
    golang.org/x/crypto v0.19.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 3. User Service - `backend/services/user-service/go.mod`

```go
module github.com/conq/backend/services/user-service

go 1.21

require (
    github.com/nats-io/nats.go v1.33.0
    go.mongodb.org/mongo-driver v1.14.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 4. Content Service - `backend/services/content-service/go.mod`

```go
module github.com/conq/backend/services/content-service

go 1.21

require (
    github.com/nats-io/nats.go v1.33.0
    go.mongodb.org/mongo-driver v1.14.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 5. Media Service - `backend/services/media-service/go.mod`

```go
module github.com/conq/backend/services/media-service

go 1.21

require (
    github.com/disintegration/imaging v1.6.2
    github.com/minio/minio-go/v7 v7.0.66
    github.com/nats-io/nats.go v1.33.0
    go.mongodb.org/mongo-driver v1.14.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 6. Scheduler Service - `backend/services/scheduler-service/go.mod`

```go
module github.com/conq/backend/services/scheduler-service

go 1.21

require (
    github.com/hibiken/asynq v0.24.1
    github.com/nats-io/nats.go v1.33.0
    github.com/redis/go-redis/v9 v9.5.1
    go.mongodb.org/mongo-driver v1.14.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 7. Publisher Service - `backend/services/publisher-service/go.mod`

```go
module github.com/conq/backend/services/publisher-service

go 1.21

require (
    github.com/nats-io/nats.go v1.33.0
    github.com/redis/go-redis/v9 v9.5.1
    go.mongodb.org/mongo-driver v1.14.0
    golang.org/x/time v0.5.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 8. Approval Service - `backend/services/approval-service/go.mod`

```go
module github.com/conq/backend/services/approval-service

go 1.21

require (
    github.com/nats-io/nats.go v1.33.0
    go.mongodb.org/mongo-driver v1.14.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 9. Analytics Service - `backend/services/analytics-service/go.mod`

```go
module github.com/conq/backend/services/analytics-service

go 1.21

require (
    github.com/nats-io/nats.go v1.33.0
    github.com/redis/go-redis/v9 v9.5.1
    go.mongodb.org/mongo-driver v1.14.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 10. Notification Service - `backend/services/notification-service/go.mod`

```go
module github.com/conq/backend/services/notification-service

go 1.21

require (
    github.com/nats-io/nats.go v1.33.0
    github.com/sendgrid/sendgrid-go v3.14.0+incompatible
    go.mongodb.org/mongo-driver v1.14.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

### 11. Platform Connectors - Each connector

```go
module github.com/conq/backend/services/platform-connectors/youtube

go 1.21

require (
    github.com/nats-io/nats.go v1.33.0
    go.mongodb.org/mongo-driver v1.14.0
    golang.org/x/oauth2 v0.17.0
    google.golang.org/api v0.165.0
    google.golang.org/grpc v1.62.0
    google.golang.org/protobuf v1.32.0
)
```

---

## 📦 Package Reference Guide

### Core Dependencies

#### 1. **MongoDB Driver** ⭐ REQUIRED
```bash
go get go.mongodb.org/mongo-driver
```
**Purpose**: Official MongoDB driver for Go  
**Used by**: All services  
**Why not Mongoose?**: Mongoose is Node.js only

**Example Usage:**
```go
import (
    "context"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
db := client.Database("conq")
collection := db.Collection("users")
```

#### 2. **NATS Client** ⭐ REQUIRED
```bash
go get github.com/nats-io/nats.go
```
**Purpose**: Message queue for event-driven communication  
**Used by**: All services  

**Example Usage:**
```go
import "github.com/nats-io/nats.go"

nc, err := nats.Connect(nats.DefaultURL)
nc.Publish("content.created", []byte("data"))
nc.Subscribe("content.created", func(m *nats.Msg) {
    // Handle message
})
```

#### 3. **gRPC & Protobuf** ⭐ REQUIRED
```bash
go get google.golang.org/grpc
go get google.golang.org/protobuf
```
**Purpose**: Inter-service communication  
**Used by**: All services  

**Example Usage:**
```go
import (
    "google.golang.org/grpc"
    pb "github.com/conq/backend/shared/proto"
)

conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
client := pb.NewAuthServiceClient(conn)
```

#### 4. **Redis Client**
```bash
go get github.com/redis/go-redis/v9
```
**Purpose**: Caching and distributed locking  
**Used by**: Scheduler, Publisher, Analytics  

**Example Usage:**
```go
import "github.com/redis/go-redis/v9"

rdb := redis.NewClient(&redis.Options{
    Addr: "localhost:6379",
})
```

---

### API Gateway Specific

#### 5. **GraphQL - gqlgen**
```bash
go get github.com/99designs/gqlgen
```
**Purpose**: GraphQL server  
**Used by**: API Gateway  

#### 6. **HTTP Router - Chi**
```bash
go get github.com/go-chi/chi/v5
```
**Purpose**: HTTP routing and middleware  
**Used by**: API Gateway  

#### 7. **CORS Handling**
```bash
go get github.com/rs/cors
```
**Purpose**: Cross-Origin Resource Sharing  
**Used by**: API Gateway  

---

### Auth Service Specific

#### 8. **JWT**
```bash
go get github.com/golang-jwt/jwt/v5
```
**Purpose**: JWT token generation and validation  
**Used by**: Auth Service  

**Example Usage:**
```go
import "github.com/golang-jwt/jwt/v5"

token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
tokenString, err := token.SignedString([]byte("secret"))
```

#### 9. **Password Hashing**
```bash
go get golang.org/x/crypto/bcrypt
```
**Purpose**: Secure password hashing  
**Used by**: Auth Service  

**Example Usage:**
```go
import "golang.org/x/crypto/bcrypt"

hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
err = bcrypt.CompareHashAndPassword(hash, []byte(password))
```

---

### Scheduler Service Specific

#### 10. **Asynq - Job Queue**
```bash
go get github.com/hibiken/asynq
```
**Purpose**: Distributed task queue (Redis-backed)  
**Used by**: Scheduler Service  

**Example Usage:**
```go
import "github.com/hibiken/asynq"

client := asynq.NewClient(asynq.RedisClientOpt{Addr: "localhost:6379"})
task := asynq.NewTask("send:email", payload)
info, err := client.Enqueue(task, asynq.ProcessIn(1*time.Hour))
```

---

### Media Service Specific

#### 11. **MinIO Client (S3)**
```bash
go get github.com/minio/minio-go/v7
```
**Purpose**: Object storage client  
**Used by**: Media Service  

**Example Usage:**
```go
import "github.com/minio/minio-go/v7"

minioClient, err := minio.New("localhost:9000", &minio.Options{
    Creds: credentials.NewStaticV4("minioadmin", "minioadmin", ""),
})
```

#### 12. **Image Processing**
```bash
go get github.com/disintegration/imaging
```
**Purpose**: Image resizing, thumbnails  
**Used by**: Media Service  

---

### Platform Connectors Specific

#### 13. **OAuth2**
```bash
go get golang.org/x/oauth2
```
**Purpose**: OAuth2 authentication flow  
**Used by**: All platform connectors  

#### 14. **YouTube API**
```bash
go get google.golang.org/api/youtube/v3
```
**Purpose**: YouTube Data API  
**Used by**: YouTube Connector  

#### 15. **Instagram API**
```bash
go get github.com/Davincible/goinsta/v3
```
**Purpose**: Instagram API client  
**Used by**: Instagram Connector  

---

### Notification Service Specific

#### 16. **SendGrid (Email)**
```bash
go get github.com/sendgrid/sendgrid-go
```
**Purpose**: Email sending  
**Used by**: Notification Service  

**Alternative:** Mailgun, AWS SES, etc.

---

### Optional but Recommended

#### 17. **Configuration Management**
```bash
go get github.com/spf13/viper
```
**Purpose**: Application configuration  
**Used by**: All services (optional)  

#### 18. **Structured Logging**
```bash
go get go.uber.org/zap
# or
go get github.com/rs/zerolog
```
**Purpose**: Fast, structured logging  
**Used by**: All services (recommended)  

#### 19. **Prometheus Metrics**
```bash
go get github.com/prometheus/client_golang
```
**Purpose**: Metrics and monitoring  
**Used by**: All services (recommended)  

#### 20. **Testing & Mocking**
```bash
go get github.com/stretchr/testify
go get github.com/golang/mock
```
**Purpose**: Unit testing and mocking  
**Used by**: All services  

---

## 🚀 Quick Installation Script

### Install All Dependencies for a Service

```bash
#!/bin/bash

# Navigate to service directory
cd backend/services/auth-service

# Initialize Go module (if not done)
go mod init github.com/conq/backend/services/auth-service

# Add dependencies
go get github.com/golang-jwt/jwt/v5
go get github.com/nats-io/nats.go
go get go.mongodb.org/mongo-driver
go get golang.org/x/crypto
go get google.golang.org/grpc
go get google.golang.org/protobuf

# Tidy up
go mod tidy
```

---

## 📋 Dependency Checklist by Service

### ✅ All Services Need:
- [ ] `go.mongodb.org/mongo-driver` (MongoDB)
- [ ] `github.com/nats-io/nats.go` (NATS)
- [ ] `google.golang.org/grpc` (gRPC)
- [ ] `google.golang.org/protobuf` (Protobuf)

### ✅ API Gateway:
- [ ] `github.com/99designs/gqlgen` (GraphQL)
- [ ] `github.com/go-chi/chi/v5` (HTTP Router)
- [ ] `github.com/rs/cors` (CORS)

### ✅ Auth Service:
- [ ] `github.com/golang-jwt/jwt/v5` (JWT)
- [ ] `golang.org/x/crypto` (Password hashing)

### ✅ Scheduler Service:
- [ ] `github.com/hibiken/asynq` (Job queue)
- [ ] `github.com/redis/go-redis/v9` (Redis)

### ✅ Media Service:
- [ ] `github.com/minio/minio-go/v7` (MinIO/S3)
- [ ] `github.com/disintegration/imaging` (Image processing)

### ✅ Platform Connectors:
- [ ] `golang.org/x/oauth2` (OAuth2)
- [ ] Platform-specific SDKs

---

## 🔄 Update Strategy

### Keep Dependencies Updated

```bash
# Check for updates
go list -u -m all

# Update all dependencies
go get -u ./...

# Update specific dependency
go get -u github.com/nats-io/nats.go

# Tidy up
go mod tidy
```

---

## ⚠️ Important Notes

### MongoDB Driver
**❌ DO NOT use Mongoose** - It's for Node.js only  
**✅ USE `go.mongodb.org/mongo-driver`** - Official Go driver

### Version Pinning
- Pin major versions in production
- Test updates in development first
- Use `go.mod` for reproducible builds

### Security
- Regularly update dependencies
- Check for vulnerabilities: `go list -m all | nancy sleuth`
- Use `go mod verify` before deploying

---

## 📚 Official Documentation

- **MongoDB Driver**: https://pkg.go.dev/go.mongodb.org/mongo-driver
- **NATS**: https://docs.nats.io/
- **gRPC**: https://grpc.io/docs/languages/go/
- **Redis**: https://redis.uptrace.dev/
- **Asynq**: https://github.com/hibiken/asynq

---

## 🎯 Summary

**Total unique packages**: ~20
**Must-have for all services**: 4 (MongoDB, NATS, gRPC, Protobuf)
**Service-specific**: 10-15 depending on service

Each service is lightweight and focused, with only the dependencies it needs!
