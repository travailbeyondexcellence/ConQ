# Claude AI Assistant Instructions

This file contains instructions and context for Claude AI when working on the ConQ project.

## Project Overview

**ConQ** is a social media content pipeline manager that helps users manage, schedule, and publish content across multiple social media platforms.

## Architecture

- **Frontend**: Next.js 16 with React 19, TypeScript, Tailwind CSS v4
- **Backend**: Go microservices with gRPC communication
- **API Gateway**: GraphQL with gqlgen
- **Database**: MongoDB
- **Cache/Session**: Redis
- **Message Broker**: NATS
- **Object Storage**: MinIO (S3-compatible)

## Technology Stack

### Frontend
- **Framework**: Next.js 16.0.0 with App Router
- **Runtime**: Bun (preferred over Node.js)
- **UI**: React 19.2.0 with TypeScript
- **Styling**: Tailwind CSS v4.1.15
- **GraphQL Client**: Apollo Client 4.0.7
- **Animations**: Framer Motion 12.23.24
- **Themes**: 12 custom themes with CSS variables

### Backend
- **Language**: Go 1.21+
- **API Gateway**: Chi router + gqlgen (GraphQL)
- **Services**: Microservices architecture with gRPC
- **Database**: MongoDB with official Go driver
- **Auth**: JWT with refresh tokens
- **Password**: Bcrypt hashing

## Key Conventions

### Before Starting Work

1. **Check `.agents/` folder** for specialized agent instructions
2. **Review `Repo_Conventions/`** for coding standards
3. **Check `Project_Updates/`** for recent changes
4. **Consult `Repo_Structure/`** for navigation

### Development Tools

- **Package Manager**: Use `bun` instead of `npm`
  ```bash
  bun install
  bun run dev
  bun add <package>
  ```

- **Go Commands**:
  ```bash
  go run main.go
  go mod tidy
  go build
  ```

### File Locations

- **Frontend**: `/frontend/web/`
- **Backend**: `/backend/`
- **Services**: `/backend/services/`
- **Shared Code**: `/backend/shared/`
- **API Gateway**: `/backend/api-gateway/`
- **Proto Files**: `/backend/shared/proto/`

## Authentication Flow

1. User submits credentials via GraphQL mutation (`login` or `register`)
2. API Gateway forwards request to auth service via gRPC
3. Auth service validates credentials and generates JWT tokens
4. Tokens stored in localStorage on frontend
5. Apollo Client includes token in Authorization header
6. Protected routes check authentication status

## GraphQL Endpoints

- **API Endpoint**: `http://localhost:8080/graphql`
- **Playground**: `http://localhost:8080/playground`

### Key Operations

**Mutations**:
- `register(input: RegisterInput!)` - User registration
- `login(input: LoginInput!)` - User login
- `logout` - User logout (blacklists token)
- `refreshToken(input: RefreshTokenInput!)` - Refresh access token

**Queries**:
- `me` - Get current user info (requires auth)
- `validateToken(token: String!)` - Validate JWT
- `health` - Health check

## Database

### MongoDB
- **Connection**: `mongodb://admin:password@localhost:27017`
- **Database**: `conq`
- **Collections**: users, refresh_tokens, content, teams

### Redis
- **Connection**: `localhost:6379`
- **Purpose**: Token blacklist, rate limiting, caching

## Important Rules

### DO:
- ✅ Use `bun` for frontend package management
- ✅ Follow existing code patterns
- ✅ Write type-safe code (TypeScript/Go)
- ✅ Update `Project_Updates/` after significant changes
- ✅ Use GraphQL for client-server communication
- ✅ Use gRPC for inter-service communication
- ✅ Handle errors gracefully
- ✅ Use theme-aware styling (CSS variables)

### DON'T:
- ❌ Don't use `npm` or `yarn` (use `bun`)
- ❌ Don't hardcode URLs (use environment variables)
- ❌ Don't commit secrets or credentials
- ❌ Don't use REST endpoints (use GraphQL)
- ❌ Don't bypass authentication on protected routes
- ❌ Don't use inline styles (use Tailwind or CSS variables)

## Environment Variables

### Backend
```bash
MONGO_URI=mongodb://admin:password@localhost:27017
DB_NAME=conq
REDIS_URI=redis://localhost:6379
JWT_SECRET=your-secret-key
PORT=8080
AUTH_SERVICE_ADDR=localhost:50051
```

### Frontend
```bash
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/graphql
```

## Running the Project

### Start Infrastructure
```bash
cd /home/zenith/Desktop/Code/ConQ
docker compose up -d
```

### Start Backend Services
```bash
# Terminal 1: Auth Service
cd backend/services/auth-service
go run main.go

# Terminal 2: API Gateway
cd backend/api-gateway
go run main.go
```

### Start Frontend
```bash
cd frontend/web
bun run dev
```

## Theming System

ConQ uses 12 custom themes:
1. Emerald
2. Emerald Night
3. Celeste
4. HiCon
5. Arctic
6. MonoChrome
7. Sunset
8. Sepia
9. Coral Fushia
10. Midnight
11. Rosey
12. Storm

### Using Themes in Components

Use CSS variables for theme-aware styling:
```tsx
style={{ backgroundColor: 'rgb(var(--card))' }}
className="bg-primary text-primary-foreground"
```

## Agent Specializations

When working on specific areas, check `.agents/` for:
- UI/Frontend guidelines
- Backend service patterns
- Database schema conventions
- Testing requirements

## Troubleshooting

### Frontend Issues
1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && bun install`
3. Check dev server is running on expected port

### Backend Issues
1. Ensure MongoDB is running: `docker ps | grep mongodb`
2. Check gRPC services are running on correct ports
3. Verify environment variables are set
4. Check go.mod dependencies: `go mod tidy`

### GraphQL Issues
1. Test with Playground: `http://localhost:8080/playground`
2. Check network tab for errors
3. Verify auth token is being sent
4. Check resolver implementation

## Testing

### Frontend
```bash
bun test
```

### Backend
```bash
go test ./...
```

## Documentation Updates

After significant changes:
1. Update `Project_Updates/` with implementation details
2. Update `Repo_Structure/` if you added new modules
3. Update this file if conventions changed
4. Update `.agents/` if agent instructions need modification

## Getting Help

1. Check `Repo_Conventions/0 Conventions.md`
2. Review `Project_Docs/` for architecture details
3. Look for similar patterns in existing code
4. Check `.agents/` for specialized instructions

---

**Project Status**: Active Development
**Current Focus**: GraphQL authentication implementation
**Next Steps**: Complete auth flow, add remaining mutations, implement route protection
