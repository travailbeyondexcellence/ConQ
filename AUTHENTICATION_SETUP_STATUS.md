# ConQ Authentication & GraphQL Setup Status

## Current Implementation Status

### ✅ COMPLETED

#### Frontend (React/Next.js)
- ✅ AuthContext with JWT token management
- ✅ Login page with form validation
- ✅ ProfileDropdown with auth state (Login button / User menu)
- ✅ Dashboard route protection (redirects to /login)
- ✅ Logout functionality
- ✅ Error handling and user-friendly messages
- ✅ Theme-aware authentication pages
- ✅ **Currently using REST API** (fetch calls to http://localhost:8080/auth/*)

#### Backend (Go)
- ✅ Microservices architecture with gRPC
- ✅ MongoDB integration
- ✅ Redis integration (for caching/blacklist)
- ✅ NATS event bus
- ✅ Auth Service with Register, Login, ValidateToken
- ✅ JWT token generation and validation
- ✅ Bcrypt password hashing
- ✅ **gqlgen** library installed (v0.17.45)

###  ❌ NOT YET IMPLEMENTED

#### Backend GraphQL Layer
- ❌ GraphQL schema definition
- ❌ gqlgen code generation
- ❌ Resolver implementation
- ❌ API Gateway GraphQL handler (currently commented out)
- ❌ gRPC client wiring in resolvers

#### Frontend GraphQL Client
- ❌ Apollo Client installation
- ❌ Apollo Provider setup
- ❌ GraphQL queries/mutations
- ❌ Apollo cache configuration

#### Missing Auth Endpoints
- ❌ POST /auth/logout (with Redis token blacklist)
- ❌ POST /auth/refresh (token rotation)
- ❌ POST /auth/forgot-password (email flow)
- ❌ POST /auth/reset-password
- ❌ POST /auth/verify-email
- ❌ POST /auth/change-password

---

## GraphQL vs REST - Current State

### What You Have Now:
```
Frontend (Next.js)
    │
    │ fetch() - REST API calls
    │
    ↓
API Gateway (Port 8080)
    │
    │ Currently returns simple JSON
    │ GraphQL handler is commented out
    │
    ↓
Auth Service (gRPC - Port 50051)
    │
    ↓
MongoDB
```

### What You Want (Full GraphQL):
```
Frontend (Next.js + Apollo Client)
    │
    │ GraphQL queries/mutations
    │
    ↓
API Gateway (Port 8080 with gqlgen)
    │
    │ Resolves GraphQL queries
    │ Calls gRPC services
    │
    ↓
Auth Service (gRPC - Port 50051)
    │
    ↓
MongoDB
```

---

## Critical Understanding: Apollo vs gqlgen

### ❌ WRONG: "Use Apollo on Backend"
Apollo Server is **Node.js/JavaScript only**. Your backend is Go.

### ✅ CORRECT: "Use gqlgen on Backend, Apollo Client on Frontend"

| Layer | Technology |
|-------|-----------|
| **Frontend** | Apollo Client (React hooks) |
| **Backend** | gqlgen (Go GraphQL server) |
| **Database** | MongoDB |

**They communicate over HTTP using GraphQL protocol** - Apollo Client sends GraphQL queries, gqlgen backend responds.

---

## MongoDB Configuration Required

### Current Setup (Development):
```bash
MONGO_URI=mongodb://admin:password@localhost:27017
```
This works with Docker Compose MongoDB service.

### What You Need to Provide:

#### Option 1: Use Docker MongoDB (for development)
1. Start Docker services:
   ```bash
   cd /home/zenith/Desktop/Code/ConQ
   docker-compose up -d mongodb redis nats minio
   ```
2. Use development URI: `mongodb://admin:password@localhost:27017`

#### Option 2: Use MongoDB Atlas (for production/testing)
1. Get your MongoDB Atlas connection string
2. Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`
3. Create `.env` file with your connection string

### Required Steps:

```bash
cd /home/zenith/Desktop/Code/ConQ

# Copy the template
cp .env.example .env

# Edit with your MongoDB credentials
nano .env  # or use your editor

# Update this line:
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
```

---

## Steps to Get Backend Running

### 1. Prerequisites
```bash
# Check if Docker is running
docker --version

# Check if Go is installed
go version

# Should see Go 1.21 or higher
```

### 2. Start Infrastructure Services
```bash
cd /home/zenith/Desktop/Code/ConQ

# Start all infrastructure
docker-compose up -d

# Verify services are running
docker ps

# Should see: mongodb, redis, nats, minio, mongo-express
```

### 3. Configure Environment
```bash
# Create .env file
cp .env.example .env

# Edit with your credentials
# CRITICAL: Update MONGO_URI with your actual MongoDB URL
```

### 4. Start Auth Service (REST Mode)
```bash
cd /home/zenith/Desktop/Code/ConQ/backend/services/auth-service

# Build and run
go run main.go
```

Expected output:
```
INFO: Starting auth-service on port 50051
INFO: Connected to MongoDB
INFO: gRPC server listening on :50051
```

### 5. Start API Gateway (REST Mode)
```bash
cd /home/zenith/Desktop/Code/ConQ/backend/api-gateway

# Build and run
go run main.go
```

Expected output:
```
INFO: Starting API Gateway on port 8080
INFO: Connected to auth-service
INFO: HTTP server listening on :8080
```

### 6. Test Authentication
```bash
# From your Next.js frontend running on localhost:3001
# Click "Log In" button
# Enter credentials and submit
# Should see API call to http://localhost:8080/auth/login
```

---

## Why Backend Won't Start Without MongoDB URL

The backend code tries to connect to MongoDB on startup:

```go
// In shared/config/mongo.go
func ConnectMongoDB() (*mongo.Client, error) {
    uri := GetEnv("MONGO_URI", "mongodb://admin:password@localhost:27017")

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
    if err != nil {
        return nil, fmt.Errorf("failed to connect to MongoDB: %w", err)
    }

    // Ping to verify connection
    if err := client.Ping(ctx, nil); err != nil {
        return nil, fmt.Errorf("failed to ping MongoDB: %w", err)
    }

    return client, nil
}
```

**If MongoDB is not running or the URI is wrong:**
- ❌ Connection timeout after 10 seconds
- ❌ Service fails to start
- ❌ Error: "failed to connect to MongoDB"

**This is why you need to either:**
1. Start Docker MongoDB (built-in with docker-compose)
2. OR provide your own MongoDB Atlas/Cloud connection string

---

## GraphQL Implementation Plan

### Phase 1: Keep REST (Current - Works Now)
1. Start Docker services
2. Provide MongoDB URL
3. Start backend services
4. Frontend authentication works via REST

### Phase 2: Add GraphQL Layer (Future)
1. Create GraphQL schema in `backend/api-gateway/graph/schema.graphql`
2. Run `gqlgen generate` to create resolvers
3. Implement resolver functions
4. Wire up gRPC client calls
5. Enable GraphQL handler in `api-gateway/main.go`

### Phase 3: Migrate Frontend to Apollo (Future)
1. Install `@apollo/client` in Next.js
2. Create Apollo Provider
3. Replace fetch() calls with GraphQL queries
4. Use React hooks: `useQuery`, `useMutation`

---

## What Happens When You Provide MongoDB URL

### Scenario: Docker MongoDB (Easiest)
```bash
# Start services
docker-compose up -d

# MongoDB is now at: mongodb://admin:password@localhost:27017
# Auth service connects ✅
# Can register users ✅
# Can login ✅
# Tokens work ✅
```

### Scenario: MongoDB Atlas
```bash
# You provide:
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/conq

# Auth service connects ✅
# Same functionality as above ✅
# Works from anywhere (cloud) ✅
```

---

## Summary

### Your Questions Answered:

**Q: Can you start the backend server?**
A: I can try, but need MongoDB running first. Docker Compose has issues on your system, so you'll need to either:
- Fix Docker Compose (`ModuleNotFoundError: No module named 'distutils'`)
- Provide MongoDB Atlas connection string
- Start Docker services manually

**Q: Are we using GraphQL?**
A: **NO, not yet.** Currently using REST API. GraphQL is planned but not implemented. gqlgen is installed but schema/resolvers don't exist yet.

**Q: Using Apollo GraphQL on client?**
A: **NO, not yet.** Frontend uses plain fetch(). Apollo Client not installed.

**Q: Using appropriate Go GraphQL library?**
A: **YES!** gqlgen v0.17.45 is installed (perfect choice). Just needs schema + implementation.

**Q: Are we using MongoDB?**
A: **YES!** MongoDB driver installed and configured. Database name: `conq`. Collections ready.

**Q: Need MongoDB URLs?**
A: **YES!** Either:
- Use Docker: `mongodb://admin:password@localhost:27017`
- Or provide your MongoDB Atlas/Cloud connection string

**Q: Need to create .env file?**
A: **YES!** I created `.env.example` template. You need to:
```bash
cp .env.example .env
# Then edit .env with your MongoDB URL
```

**Q: Will features work without database?**
A: **NO!** Backend won't even start without valid MongoDB connection. It tries to connect on startup and fails if MongoDB is unreachable.

---

## Next Steps (In Order)

1. **Fix Docker or provide MongoDB URL** ← YOU MUST DO THIS
2. Create `.env` file with your MongoDB credentials
3. Start infrastructure (MongoDB, Redis, NATS, MinIO)
4. Start auth-service
5. Start api-gateway
6. Test login from frontend (http://localhost:3001)
7. ✅ Authentication should work end-to-end!

GraphQL can be added later - REST works fine for now!
