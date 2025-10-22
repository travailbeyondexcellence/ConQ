# ConQ Backend - Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Start infrastructure (MongoDB, Redis, NATS, MinIO)
cd /home/zenith/Desktop/Code/ConQ
docker-compose up -d

# Check infrastructure status
docker-compose ps

# Start all backend services
cd backend
./scripts/start-all-services.sh

# Start individual service
cd backend/services/auth-service
go run main.go
```

---

## 📡 Service Ports

| Service | Port | Status | Purpose |
|---------|------|--------|---------|
| API Gateway | 8080 | ⚠️ Basic | GraphQL endpoint |
| Auth Service | 50051 | ✅ Active | Authentication & JWT |
| User Service | 50052 | 🏗️ Structure | User/Team management |
| Content Service | 50053 | 🏗️ Structure | Content CRUD |
| Scheduler Service | 50054 | 🏗️ Structure | Post scheduling |
| Publisher Service | 50055 | 🏗️ Structure | Platform publishing |
| Media Service | 50056 | 🏗️ Structure | Media upload/processing |
| Approval Service | 50057 | 🏗️ Structure | Approval workflows |
| Analytics Service | 50058 | 🏗️ Structure | Performance tracking |
| Notification Service | 50059 | 🏗️ Structure | Email/push notifications |

### Infrastructure
- MongoDB: 27017
- Mongo Express: 8081 (admin/password)
- Redis: 6379
- NATS: 4222 (client), 8222 (monitoring)
- MinIO: 9000 (API), 9001 (console)

---

## 🔐 Auth Endpoints Status

### ✅ Implemented
- `Register(email, password, name)` - User registration
- `Login(email, password)` - User authentication
- `ValidateToken(token)` - JWT validation

### ❌ To Implement (Priority Order)
1. **Logout** - Token blacklisting
2. **RefreshToken** - Get new access token
3. **ForgotPassword** - Send reset email
4. **ResetPassword** - Update password with token
5. **VerifyEmail** - Confirm email address
6. **ChangePassword** - Update password when authenticated
7. **ResendVerification** - Resend verification email

---

## 🗄️ Database Quick Reference

### MongoDB Connection
```go
URI: mongodb://admin:password@localhost:27017
Database: conq
```

### Collections
- `users` - User accounts
- `refresh_tokens` - Refresh token storage
- `teams` - Team/workspace data
- `content` - Posts and content

### User Document
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password_hash": "$2a$10$...",
  "name": "John Doe",
  "role": "user",
  "created_at": ISODate,
  "updated_at": ISODate
}
```

### Redis Keys
```
blacklist:access_token:{jti}    // Token blacklist
blacklist:refresh_token:{jti}   // Refresh token blacklist
rate_limit:login:{ip}           // Rate limiting
lockout:{user_id}               // Account lockout
```

---

## 🔑 Environment Variables

### Auth Service (.env or export)
```bash
GRPC_PORT=50051
SERVICE_NAME=auth-service
MONGO_URI=mongodb://admin:password@localhost:27017
DB_NAME=conq
NATS_URL=nats://localhost:4222
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=24h
ENV=development
LOG_LEVEL=info
```

### API Gateway
```bash
PORT=8080
```

---

## 📦 Key Dependencies

### Auth Service
```go
github.com/golang-jwt/jwt/v5 v5.2.0           // JWT
go.mongodb.org/mongo-driver v1.14.0           // MongoDB
github.com/nats-io/nats.go v1.33.0            // Event bus
golang.org/x/crypto v0.19.0                   // bcrypt
google.golang.org/grpc v1.62.0                // gRPC
```

### Shared Utilities
```go
github.com/rs/zerolog v1.32.0                 // Logging
github.com/redis/go-redis/v9 v9.5.1          // Redis
```

---

## 🎯 Authentication Flow (High-Level)

### Registration
```
Frontend → API Gateway → Auth Service
                          ├─ Check if user exists (MongoDB)
                          ├─ Hash password (bcrypt)
                          ├─ Create user (MongoDB)
                          ├─ Generate JWT
                          └─ Publish event (NATS)
                          ↓
Frontend ← { accessToken, user }
```

### Login
```
Frontend → API Gateway → Auth Service
                          ├─ Find user by email (MongoDB)
                          ├─ Verify password (bcrypt)
                          ├─ Generate tokens (JWT)
                          └─ Publish event (NATS)
                          ↓
Frontend ← { accessToken, refreshToken, user }
```

### Authenticated Request
```
Frontend → API Gateway → Check JWT
                          ├─ Validate with Auth Service
                          ├─ Check blacklist (Redis)
                          └─ Forward to service
                          ↓
Frontend ← Response
```

---

## 🛠️ Common Development Tasks

### Generate Protocol Buffers
```bash
cd /home/zenith/Desktop/Code/ConQ/backend/shared/proto
protoc --go_out=. --go-grpc_out=. *.proto
```

### Test MongoDB Connection
```bash
mongosh mongodb://admin:password@localhost:27017
use conq
db.users.find()
```

### Test Redis Connection
```bash
redis-cli
PING
KEYS *
```

### View NATS Monitoring
```bash
curl http://localhost:8222/varz
```

### View Service Logs
```bash
# Check service logs
cd /home/zenith/Desktop/Code/ConQ/backend/services/auth-service
go run main.go

# With debug logging
LOG_LEVEL=debug go run main.go
```

---

## 🧪 Testing Endpoints

### Using curl (After API Gateway is implemented)
```bash
# Register
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { register(email: \"test@example.com\", password: \"password123\", name: \"Test User\") { accessToken user { id email name } } }"
  }'

# Login
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { login(email: \"test@example.com\", password: \"password123\") { accessToken user { id email } } }"
  }'

# Authenticated Request
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "query": "query { me { id email name role } }"
  }'
```

---

## 📂 File Structure Quick Map

```
backend/
├── api-gateway/
│   └── main.go                              # Entry point
│
├── services/
│   └── auth-service/
│       ├── config/config.go                 # Service config
│       ├── handlers/auth_handler.go         # gRPC handlers
│       ├── models/user.go                   # Data models
│       ├── repository/user_repository.go    # Database layer
│       ├── service/auth_service.go          # Business logic
│       └── main.go                          # Service entry
│
├── shared/
│   ├── config/
│   │   ├── env.go                          # Environment helpers
│   │   ├── mongo.go                        # MongoDB connection
│   │   ├── redis.go                        # Redis connection
│   │   └── nats.go                         # NATS connection
│   ├── utils/
│   │   ├── logger.go                       # Structured logging
│   │   ├── validator.go                    # Input validation
│   │   ├── middleware.go                   # gRPC interceptors
│   │   └── response.go                     # Response helpers
│   └── proto/
│       ├── common.proto                    # Common messages
│       └── auth.proto                      # Auth service definition
│
└── scripts/
    └── start-all-services.sh               # Start all services
```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
docker ps | grep mongo

# Restart MongoDB
docker-compose restart mongodb

# Check logs
docker-compose logs mongodb
```

### Redis Connection Failed
```bash
# Check if Redis is running
docker ps | grep redis

# Test connection
redis-cli ping
```

### NATS Connection Failed
```bash
# Check if NATS is running
docker ps | grep nats

# Check monitoring
curl http://localhost:8222/varz
```

### Service Won't Start
```bash
# Check port availability
lsof -i :50051

# Kill process on port
kill -9 $(lsof -t -i:50051)

# Check go.mod
cd backend/services/auth-service
go mod tidy
go mod download
```

---

## 🔄 NATS Event Subjects

### Auth Events
```
auth.user.registered    // User registration complete
auth.user.login         // User logged in
auth.user.logout        // User logged out
```

### Content Events
```
content.post.created    // New post created
content.post.updated    // Post updated
content.post.deleted    // Post deleted
```

### Scheduler Events
```
scheduler.post.scheduled    // Post scheduled
scheduler.post.triggered    // Time to publish
```

### Publisher Events
```
publisher.post.completed    // Successfully published
publisher.post.failed       // Publishing failed
```

---

## 📊 Current Implementation Status

### ✅ Complete (70%)
- Microservices architecture setup
- MongoDB, Redis, NATS infrastructure
- Auth service (register, login, validate)
- User repository with CRUD operations
- JWT token generation
- Password hashing (bcrypt)
- Shared utilities and config
- Protocol buffer definitions
- Event-driven architecture (NATS)

### 🏗️ In Progress (20%)
- API Gateway GraphQL layer
- Service folder structures

### ❌ To Do (10%)
- Logout with blacklist
- Refresh token implementation
- Forgot/reset password
- Email verification
- Rate limiting
- Frontend integration

---

## 🎯 Next Implementation Steps

### Week 1: Complete Auth Service
1. Implement logout with Redis blacklist
2. Add refresh token logic
3. Create forgot password flow
4. Add reset password endpoint
5. Update user model with new fields

### Week 2: API Gateway
1. Define GraphQL schema
2. Create gRPC clients
3. Implement resolvers
4. Add JWT middleware
5. Error handling

### Week 3: Integration & Security
1. Rate limiting
2. Account lockout
3. Email service integration
4. Security hardening
5. Testing

---

## 📞 Important Paths

- **Project Root:** `/home/zenith/Desktop/Code/ConQ`
- **Backend Root:** `/home/zenith/Desktop/Code/ConQ/backend`
- **Auth Service:** `/home/zenith/Desktop/Code/ConQ/backend/services/auth-service`
- **API Gateway:** `/home/zenith/Desktop/Code/ConQ/backend/api-gateway`
- **Shared Code:** `/home/zenith/Desktop/Code/ConQ/backend/shared`
- **Proto Files:** `/home/zenith/Desktop/Code/ConQ/backend/shared/proto`

---

## 📚 Additional Documentation

- Full Analysis: `AUTH_API_ANALYSIS.md`
- Architecture Diagrams: `AUTH_ARCHITECTURE_DIAGRAM.md`
- Main README: `README.md`
- Services Summary: `SERVICES_SUMMARY.md`

---

**Last Updated:** October 22, 2025
**Version:** 1.0
**Status:** Planning & Analysis Phase Complete
