# ConQ Backend - Authentication API Analysis & Planning Report

**Date:** October 22, 2025
**Working Directory:** `/home/zenith/Desktop/Code/ConQ`
**Purpose:** Comprehensive analysis of existing backend structure and authentication implementation planning

---

## 📁 1. BACKEND ARCHITECTURE OVERVIEW

### 1.1 Technology Stack
- **Language:** Go 1.21
- **Architecture:** Microservices with gRPC communication
- **API Gateway:** HTTP/GraphQL (Chi + gqlgen) on port 8080
- **Database:** MongoDB (via mongo-driver)
- **Cache:** Redis
- **Message Queue:** NATS for event-driven communication
- **Object Storage:** MinIO (S3-compatible)
- **Authentication:** JWT (JSON Web Tokens)

### 1.2 Complete Folder Structure

```
backend/
├── api-gateway/                    # GraphQL API Gateway (Port 8080)
│   ├── main.go                    # Chi router with CORS
│   ├── go.mod
│   └── README.md
│
├── services/                       # Microservices
│   ├── auth-service/              # Port 50051 ✅ IMPLEMENTED
│   │   ├── config/
│   │   │   └── config.go         # Service configuration
│   │   ├── handlers/
│   │   │   └── auth_handler.go   # gRPC handlers (Register, Login, ValidateToken)
│   │   ├── models/
│   │   │   └── user.go           # User model, RegisterRequest, LoginRequest, AuthResponse
│   │   ├── repository/
│   │   │   └── user_repository.go # MongoDB CRUD operations
│   │   ├── service/
│   │   │   └── auth_service.go   # Business logic, JWT generation, bcrypt
│   │   ├── main.go               # Complete server with graceful shutdown
│   │   └── go.mod
│   │
│   ├── user-service/              # Port 50052 (Structure only)
│   │   ├── models/user.go        # User & Team models defined
│   │   └── main.go               # Boilerplate only
│   │
│   ├── content-service/           # Port 50053 (Structure only)
│   │   ├── models/content.go     # Content model defined
│   │   └── main.go
│   │
│   ├── scheduler-service/         # Port 50054
│   ├── publisher-service/         # Port 50055
│   ├── media-service/             # Port 50056
│   ├── approval-service/          # Port 50057
│   ├── analytics-service/         # Port 50058
│   ├── notification-service/      # Port 50059
│   │
│   └── platform-connectors/       # Social media integrations
│       ├── youtube/               # Port 50061
│       ├── instagram/             # Port 50062
│       ├── tiktok/                # Port 50063
│       ├── facebook/              # Port 50064
│       ├── linkedin/              # Port 50065
│       └── twitter/               # Port 50066
│
├── shared/                         # Shared utilities & configs
│   ├── config/
│   │   ├── env.go                # Environment variable helpers
│   │   ├── mongo.go              # MongoDB connection management ✅
│   │   ├── redis.go              # Redis connection management ✅
│   │   └── nats.go               # NATS event bus with subjects ✅
│   ├── utils/
│   │   ├── logger.go             # Structured logging (zerolog) ✅
│   │   ├── validator.go          # Input validation ✅
│   │   ├── middleware.go         # gRPC interceptors ✅
│   │   └── response.go           # Common response helpers ✅
│   └── proto/                     # Protocol Buffer definitions
│       ├── common.proto          # User, Content, Schedule, Media messages ✅
│       └── auth.proto            # AuthService gRPC definition ✅
│
└── scripts/
    └── start-all-services.sh      # Helper script to start all services
```

---

## 🔌 2. DATABASE CONNECTION STATUS

### 2.1 MongoDB Configuration ✅ FULLY CONFIGURED

**Location:** `/home/zenith/Desktop/Code/ConQ/backend/shared/config/mongo.go`

**Features:**
- Connection pooling via mongo-driver
- Health check ping
- Graceful disconnection
- Helper functions: `ConnectMongo()`, `GetDatabase()`, `GetCollection()`, `DisconnectMongo()`

**Connection String:**
```
mongodb://admin:password@localhost:27017
```

**Database Name:** `conq`

**Docker Setup (docker-compose.yml):**
- MongoDB 7.0 on port 27017
- Mongo Express UI on port 8081
- Persistent volumes configured
- Default credentials: admin/password

### 2.2 Redis Configuration ✅ CONFIGURED

**Location:** `/home/zenith/Desktop/Code/ConQ/backend/shared/config/redis.go`

**Features:**
- Connection management
- Key-value operations: `SetValue()`, `GetValue()`, `DeleteValue()`, `Exists()`
- Expiration support

**Default:** `redis://localhost:6379`

### 2.3 NATS Configuration ✅ CONFIGURED

**Location:** `/home/zenith/Desktop/Code/ConQ/backend/shared/config/nats.go`

**Event Subjects Defined:**
- `auth.user.registered`
- `auth.user.login`
- `auth.user.logout`
- Content, scheduler, publisher, approval, analytics events

---

## 🔐 3. EXISTING AUTH SERVICE IMPLEMENTATION

### 3.1 Current Implementation Status ✅ MOSTLY COMPLETE

**Implemented Features:**

1. **User Registration** ✅
   - Email validation
   - Password hashing (bcrypt)
   - User creation in MongoDB
   - JWT token generation
   - NATS event publishing (`auth.user.registered`)

2. **User Login** ✅
   - Email/password authentication
   - Password verification (bcrypt)
   - JWT token generation
   - NATS event publishing (`auth.user.login`)

3. **Token Validation** ✅
   - JWT parsing and verification
   - Claims extraction (user_id, email)
   - HMAC signing method validation

4. **User Repository** ✅
   - `CreateUser()`
   - `GetUserByEmail()`
   - `GetUserByID()`
   - `UpdateUser()`
   - `DeleteUser()`
   - `UserExists()`

### 3.2 User Model Schema

**Location:** `/home/zenith/Desktop/Code/ConQ/backend/services/auth-service/models/user.go`

```go
type User struct {
    ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
    Email        string             `bson:"email" json:"email"`
    PasswordHash string             `bson:"password_hash" json:"-"`
    Name         string             `bson:"name" json:"name"`
    Role         string             `bson:"role" json:"role"`
    CreatedAt    time.Time          `bson:"created_at" json:"created_at"`
    UpdatedAt    time.Time          `bson:"updated_at" json:"updated_at"`
}
```

**Collections:**
- `users` - Main user collection in MongoDB

---

## 🚧 4. MISSING AUTH ENDPOINTS (TO BE IMPLEMENTED)

### 4.1 Critical Missing Features

| Endpoint | Status | Priority | Description |
|----------|--------|----------|-------------|
| **Logout** | ❌ Missing | HIGH | Token invalidation/blacklist |
| **Forgot Password** | ❌ Missing | HIGH | Password reset flow |
| **Reset Password** | ❌ Missing | HIGH | Password update with token |
| **Refresh Token** | ⚠️ Partial | MEDIUM | Token in model but no implementation |
| **Email Verification** | ❌ Missing | MEDIUM | Verify user email addresses |
| **Change Password** | ❌ Missing | MEDIUM | Authenticated password update |
| **Update Profile** | ❌ Missing | LOW | User profile updates |
| **Delete Account** | ❌ Missing | LOW | Account deletion |
| **OAuth Integration** | ❌ Missing | LOW | Google, GitHub, etc. |

### 4.2 Security Enhancements Needed

1. **Token Blacklisting** - Redis-based token revocation for logout
2. **Rate Limiting** - Prevent brute force attacks
3. **Password Reset Tokens** - Time-limited reset codes
4. **Email Verification Tokens** - Confirmation codes
5. **Refresh Token Rotation** - Security best practice
6. **Account Lockout** - After failed login attempts
7. **Session Management** - Active session tracking

---

## 📋 5. PROTOCOL BUFFER DEFINITIONS

### 5.1 Auth Service Proto ✅ DEFINED

**Location:** `/home/zenith/Desktop/Code/ConQ/backend/shared/proto/auth.proto`

**Existing gRPC Methods:**
```protobuf
service AuthService {
  rpc Register(RegisterRequest) returns (AuthResponse);
  rpc Login(LoginRequest) returns (AuthResponse);
  rpc ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse);
  rpc RefreshToken(RefreshTokenRequest) returns (AuthResponse);
}
```

**Note:** Proto files are defined but NOT yet compiled to Go code.

**To Generate:**
```bash
cd /home/zenith/Desktop/Code/ConQ/backend/shared/proto
protoc --go_out=. --go-grpc_out=. *.proto
```

---

## 🎯 6. RECOMMENDED AUTHENTICATION APPROACH

### 6.1 Authentication Strategy: JWT with Refresh Tokens

**Rationale:**
- ✅ Already implemented JWT infrastructure
- ✅ Stateless authentication for microservices
- ✅ Scalable across distributed systems
- ✅ Works well with GraphQL gateway
- ✅ Redis available for token blacklisting

### 6.2 Proposed Token Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Flow                       │
└─────────────────────────────────────────────────────────────┘

1. Login → Access Token (15 min) + Refresh Token (7 days)
2. Access Token expires → Use Refresh Token → New Access Token
3. Logout → Blacklist both tokens in Redis
4. Password Reset → Email token (1 hour expiry)
```

**Token Types:**

1. **Access Token (Short-lived)**
   - Duration: 15-30 minutes
   - Used for API requests
   - Contains: user_id, email, role
   - Stored in: Memory/localStorage (frontend)

2. **Refresh Token (Long-lived)**
   - Duration: 7-30 days
   - Used to get new access tokens
   - Stored in: HttpOnly cookie (recommended)
   - Should be rotated on use

3. **Password Reset Token**
   - Duration: 1 hour
   - Single-use token
   - Stored in: MongoDB with user_id
   - Sent via email

4. **Email Verification Token**
   - Duration: 24 hours
   - Single-use token
   - Stored in: MongoDB with user_id

### 6.3 Security Implementation Plan

**Phase 1: Core Auth (Existing)**
- ✅ JWT generation
- ✅ Password hashing (bcrypt)
- ✅ Token validation

**Phase 2: Token Management (TODO)**
- Implement refresh token rotation
- Redis-based token blacklist for logout
- Short-lived access tokens

**Phase 3: Password Recovery (TODO)**
- Forgot password endpoint
- Email with reset token
- Reset password endpoint
- Token expiration validation

**Phase 4: Email Verification (TODO)**
- Send verification email on register
- Verify email endpoint
- Resend verification endpoint

**Phase 5: Security Hardening (TODO)**
- Rate limiting (Redis)
- Account lockout after failed attempts
- IP-based suspicious activity detection
- Password strength validation
- CAPTCHA integration (optional)

---

## 🔗 7. API GATEWAY INTEGRATION

### 7.1 Current Gateway Status

**Location:** `/home/zenith/Desktop/Code/ConQ/backend/api-gateway/main.go`

**Status:** Basic Chi router setup with CORS

**Existing:**
- ✅ Chi router
- ✅ CORS middleware
- ✅ Health check endpoint
- ✅ Logging and recovery middleware

**Missing:**
- ❌ GraphQL schema
- ❌ gRPC client connections to services
- ❌ JWT middleware
- ❌ GraphQL resolvers

### 7.2 Recommended Gateway Auth Flow

```
Frontend Request
      ↓
   API Gateway (8080)
      ↓
   JWT Middleware
      ↓
   Extract user_id from token
      ↓
   gRPC call to Auth Service (50051) for validation
      ↓
   Forward authenticated request to other services
```

---

## 🛠️ 8. IMPLEMENTATION ROADMAP

### Phase 1: Complete Auth Service (Priority: HIGH)

**Tasks:**
1. ✅ Register endpoint (DONE)
2. ✅ Login endpoint (DONE)
3. ✅ Validate token (DONE)
4. ❌ Implement refresh token logic
5. ❌ Implement logout with Redis blacklist
6. ❌ Forgot password flow
7. ❌ Reset password endpoint
8. ❌ Email verification (optional)
9. ❌ Change password endpoint

**Estimated Effort:** 3-4 days

### Phase 2: API Gateway GraphQL Layer (Priority: HIGH)

**Tasks:**
1. ❌ Define GraphQL schema for auth
2. ❌ Implement GraphQL resolvers
3. ❌ Create gRPC clients for auth-service
4. ❌ Add JWT middleware
5. ❌ Error handling and validation

**Estimated Effort:** 2-3 days

### Phase 3: Frontend Integration (Priority: MEDIUM)

**Tasks:**
1. ❌ Login/Register forms
2. ❌ Token storage and refresh
3. ❌ Protected route middleware
4. ❌ Password reset flow UI
5. ❌ Email verification UI

**Estimated Effort:** 3-4 days

### Phase 4: Security Hardening (Priority: MEDIUM)

**Tasks:**
1. ❌ Rate limiting
2. ❌ Account lockout
3. ❌ Security logging
4. ❌ HTTPS enforcement
5. ❌ CORS refinement

**Estimated Effort:** 2-3 days

---

## 📝 9. REQUIRED API ENDPOINTS

### 9.1 Auth Service gRPC Methods

```protobuf
service AuthService {
  // Existing
  rpc Register(RegisterRequest) returns (AuthResponse);
  rpc Login(LoginRequest) returns (AuthResponse);
  rpc ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse);
  rpc RefreshToken(RefreshTokenRequest) returns (AuthResponse);

  // To be added
  rpc Logout(LogoutRequest) returns (Status);
  rpc ForgotPassword(ForgotPasswordRequest) returns (Status);
  rpc ResetPassword(ResetPasswordRequest) returns (Status);
  rpc VerifyEmail(VerifyEmailRequest) returns (Status);
  rpc ChangePassword(ChangePasswordRequest) returns (Status);
  rpc ResendVerificationEmail(ResendVerificationRequest) returns (Status);
}
```

### 9.2 GraphQL API Mutations (Gateway)

```graphql
type Mutation {
  # Authentication
  register(email: String!, password: String!, name: String!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  logout: Boolean!
  refreshToken: AuthPayload!

  # Password Management
  forgotPassword(email: String!): Boolean!
  resetPassword(token: String!, newPassword: String!): Boolean!
  changePassword(oldPassword: String!, newPassword: String!): Boolean!

  # Email Verification
  verifyEmail(token: String!): Boolean!
  resendVerificationEmail: Boolean!
}

type Query {
  me: User!
  validateToken(token: String!): TokenValidation!
}

type AuthPayload {
  success: Boolean!
  message: String!
  accessToken: String
  refreshToken: String
  user: User
}

type User {
  id: ID!
  email: String!
  name: String!
  role: String!
  emailVerified: Boolean!
  createdAt: String!
  updatedAt: String!
}

type TokenValidation {
  valid: Boolean!
  userId: ID
  message: String
}
```

---

## 🗄️ 10. DATABASE SCHEMA

### 10.1 Users Collection (MongoDB)

```json
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "password_hash": "$2a$10$...",
  "name": "John Doe",
  "role": "user",
  "email_verified": false,
  "verification_token": "random-token",
  "verification_token_expires": ISODate("..."),
  "reset_token": "random-token",
  "reset_token_expires": ISODate("..."),
  "failed_login_attempts": 0,
  "locked_until": null,
  "last_login": ISODate("..."),
  "created_at": ISODate("..."),
  "updated_at": ISODate("...")
}
```

**Indexes:**
- `email` (unique)
- `verification_token`
- `reset_token`
- `created_at`

### 10.2 Refresh Tokens Collection (MongoDB)

```json
{
  "_id": ObjectId("..."),
  "user_id": "user_object_id",
  "token": "hashed-refresh-token",
  "expires_at": ISODate("..."),
  "created_at": ISODate("..."),
  "revoked": false
}
```

**Indexes:**
- `token` (unique)
- `user_id`
- `expires_at` (TTL index)

### 10.3 Token Blacklist (Redis)

```
Key: "blacklist:access_token:{jti}"
Value: "1"
Expiry: Token expiration time
```

```
Key: "blacklist:refresh_token:{token_id}"
Value: "1"
Expiry: Token expiration time
```

---

## 🔒 11. SECURITY CONSIDERATIONS

### 11.1 Current Security Features ✅

- ✅ bcrypt password hashing (cost: 10)
- ✅ JWT signing with HS256
- ✅ CORS configuration
- ✅ gRPC interceptors (logging, recovery)
- ✅ MongoDB authentication
- ✅ Structured logging

### 11.2 Security Gaps ❌

- ❌ No rate limiting
- ❌ No account lockout
- ❌ No token blacklisting
- ❌ No email verification
- ❌ No password strength validation
- ❌ No HTTPS enforcement (production)
- ❌ No input sanitization
- ❌ No CSRF protection
- ❌ No session management
- ❌ No audit logging

### 11.3 Recommended Security Additions

1. **Rate Limiting** (Redis)
   ```
   Key: "rate_limit:login:{ip}"
   Value: attempt_count
   Expiry: 15 minutes
   Limit: 5 attempts
   ```

2. **Password Policy**
   - Minimum 8 characters
   - At least 1 uppercase, 1 lowercase, 1 number, 1 special char
   - Not in common password list

3. **Token Security**
   - Short-lived access tokens (15 min)
   - HttpOnly, Secure, SameSite cookies for refresh tokens
   - Token rotation on refresh
   - Blacklist on logout

4. **Account Protection**
   - Lock account after 5 failed attempts for 30 minutes
   - Email notification on suspicious activity
   - IP-based anomaly detection

---

## 📦 12. DEPENDENCIES & VERSIONS

### 12.1 Existing Dependencies (auth-service)

```go
github.com/golang-jwt/jwt/v5 v5.2.0           // JWT tokens
go.mongodb.org/mongo-driver v1.14.0           // MongoDB driver
github.com/nats-io/nats.go v1.33.0            // Event bus
golang.org/x/crypto v0.19.0                   // bcrypt
google.golang.org/grpc v1.62.0                // gRPC
google.golang.org/protobuf v1.32.0            // Protobuf
```

### 12.2 Additional Dependencies Needed

```go
// For email sending
github.com/sendgrid/sendgrid-go v3.14.0

// For rate limiting
github.com/redis/go-redis/v9 v9.5.1 (already in shared)

// For password validation
github.com/go-playground/validator/v10 v10.18.0

// For UUID generation
github.com/google/uuid v1.6.0
```

---

## 🚀 13. NEXT STEPS

### Immediate Actions (Week 1)

1. **Generate Protocol Buffer Code**
   ```bash
   cd /home/zenith/Desktop/Code/ConQ/backend/shared/proto
   protoc --go_out=. --go-grpc_out=. *.proto
   ```

2. **Implement Missing Auth Endpoints**
   - Logout with Redis blacklist
   - Refresh token logic
   - Forgot/reset password flow

3. **Add User Model Fields**
   - `email_verified`
   - `verification_token`
   - `reset_token`
   - `failed_login_attempts`
   - `locked_until`
   - `last_login`

4. **Create Additional Proto Messages**
   - LogoutRequest
   - ForgotPasswordRequest
   - ResetPasswordRequest
   - VerifyEmailRequest

### Short-term (Week 2-3)

5. **Implement API Gateway GraphQL**
   - Define schema
   - Create gRPC clients
   - Implement resolvers
   - Add JWT middleware

6. **Security Enhancements**
   - Rate limiting
   - Password validation
   - Token blacklisting

7. **Testing**
   - Unit tests for auth service
   - Integration tests for API flow
   - Load testing

### Medium-term (Week 4+)

8. **Email Service Integration**
   - Notification service setup
   - Email templates
   - SendGrid/SMTP integration

9. **Frontend Integration**
   - Auth context
   - Protected routes
   - Token refresh logic

10. **Documentation**
    - API documentation
    - Postman collection
    - Developer guide

---

## 📊 14. SUMMARY

### What's Working ✅
- Microservices architecture foundation
- MongoDB, Redis, NATS infrastructure running
- Auth service with register/login/validate
- User repository with full CRUD
- JWT token generation
- Password hashing
- Event-driven architecture with NATS
- Shared utilities and middleware

### What's Missing ❌
- Logout implementation
- Forgot/reset password flow
- Email verification
- Refresh token implementation
- Token blacklisting
- Rate limiting
- API Gateway GraphQL layer
- Frontend auth integration
- Security hardening

### Recommended Approach 🎯
**Use JWT with Refresh Tokens + Redis Blacklist**

**Why:**
- Scalable for microservices
- Stateless authentication
- Secure with proper implementation
- Already 70% implemented
- Industry standard

**Next Sprint Focus:**
1. Complete auth endpoints (logout, forgot password, refresh)
2. Implement API Gateway GraphQL layer
3. Add security features (rate limiting, blacklist)
4. Frontend integration

---

**Report Generated:** October 22, 2025
**Status:** Ready for implementation phase
**Estimated Completion:** 2-3 weeks for full auth system
