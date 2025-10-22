# Conq Backend

Microservices-based backend for Conq built with Go.

## Architecture

- **API Gateway**: GraphQL API gateway on port 8080
- **Microservices**: Domain-specific services communicating via gRPC
- **Message Queue**: NATS for event-driven architecture
- **Database**: MongoDB for data persistence
- **Cache**: Redis for caching and distributed locking
- **Object Storage**: MinIO (S3-compatible) for media files

## Services

| Service | Port | Purpose |
|---------|------|---------|
| API Gateway | 8080 | GraphQL endpoint for frontends |
| Auth Service | 50051 | Authentication & JWT |
| User Service | 50052 | User management & teams |
| Content Service | 50053 | Content CRUD operations |
| Scheduler Service | 50054 | Post scheduling |
| Publisher Service | 50055 | Publishing to platforms |
| Media Service | 50056 | Media upload & processing |
| Approval Service | 50057 | Approval workflows |
| Analytics Service | 50058 | Performance tracking |
| Notification Service | 50059 | Email & push notifications |
| YouTube Connector | 50061 | YouTube integration |
| Instagram Connector | 50062 | Instagram integration |
| TikTok Connector | 50063 | TikTok integration |
| Facebook Connector | 50064 | Facebook integration |
| LinkedIn Connector | 50065 | LinkedIn integration |
| Twitter Connector | 50066 | Twitter/X integration |

## Quick Start

### 1. Start Infrastructure

```bash
# From project root
docker-compose up -d
```

This starts:
- MongoDB (27017)
- Redis (6379)
- NATS (4222)
- MinIO (9000, 9001)
- Mongo Express UI (8081)

### 2. Install Dependencies

```bash
# For each service
cd backend/services/auth-service
go mod download
```

### 3. Start All Services

```bash
cd backend
./scripts/start-all-services.sh
```

Or start individually:

```bash
cd backend/services/auth-service
go run main.go
```

## Project Structure

```
backend/
├── api-gateway/              # GraphQL API Gateway
│   ├── graph/               # GraphQL schema & resolvers
│   ├── main.go
│   └── go.mod
│
├── services/                 # Microservices
│   ├── auth-service/
│   ├── user-service/
│   ├── content-service/
│   ├── media-service/
│   ├── scheduler-service/
│   ├── publisher-service/
│   ├── approval-service/
│   ├── analytics-service/
│   ├── notification-service/
│   └── platform-connectors/
│       ├── youtube/
│       ├── instagram/
│       ├── tiktok/
│       ├── facebook/
│       ├── linkedin/
│       └── twitter/
│
├── shared/                   # Shared code
│   ├── proto/               # Protocol Buffer definitions
│   ├── utils/               # Common utilities
│   └── config/              # Shared configurations
│
└── scripts/                  # Helper scripts
    ├── start-all-services.sh
    └── stop-all-services.sh
```

## Communication Patterns

### 1. Frontend ↔ Backend (GraphQL)

```
Web/Mobile → [GraphQL] → API Gateway (8080)
```

### 2. Inter-Service (gRPC)

```
API Gateway → [gRPC] → Auth Service (50051)
API Gateway → [gRPC] → Content Service (50053)
```

### 3. Event-Driven (NATS)

```
Content Service → [NATS: content.created] → Other Services
Publisher → [NATS: post.published] → Analytics
```

## Development

### Adding a New Service

1. Create service directory:
```bash
mkdir -p backend/services/my-service
cd backend/services/my-service
```

2. Initialize Go module:
```bash
go mod init github.com/conq/backend/services/my-service
```

3. Add dependencies:
```bash
go get go.mongodb.org/mongo-driver
go get github.com/nats-io/nats.go
go get google.golang.org/grpc
```

4. Create `main.go` with gRPC server

5. Add to `start-all-services.sh`

### Protocol Buffers

Define services in `backend/shared/proto/`:

```protobuf
service ContentService {
  rpc CreateContent(CreateContentRequest) returns (ContentResponse);
  rpc GetContent(GetContentRequest) returns (ContentResponse);
}
```

Generate code:

```bash
protoc --go_out=. --go-grpc_out=. proto/*.proto
```

### NATS Events

Subject pattern: `<service>.<entity>.<action>`

Examples:
- `content.post.created`
- `scheduler.post.triggered`
- `publisher.post.completed`

## Environment Variables

Each service needs:

```bash
# Service configuration
GRPC_PORT=5005X
SERVICE_NAME=auth-service

# MongoDB
MONGO_URI=mongodb://admin:password@localhost:27017
DB_NAME=conq

# NATS
NATS_URL=nats://localhost:4222

# Redis (if needed)
REDIS_URI=redis://localhost:6379

# MinIO (for media-service)
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
```

## Testing

```bash
# Unit tests
go test ./...

# Specific service
cd backend/services/auth-service
go test -v
```

## Deployment

### Docker

Each service can be containerized:

```dockerfile
FROM golang:1.21-alpine
WORKDIR /app
COPY . .
RUN go build -o main .
CMD ["./main"]
```

### Kubernetes

Use Helm charts in `infra/k8s/` directory.

## Monitoring

- **Logs**: JSON structured logging with zerolog
- **Metrics**: Prometheus metrics on `/metrics` endpoint
- **Health**: `/health` and `/ready` endpoints
- **Tracing**: OpenTelemetry integration

## Security

- JWT authentication in auth-service
- gRPC TLS in production
- MongoDB authentication
- Rate limiting per service
- Input validation at API Gateway

## Common Commands

```bash
# Start infrastructure
docker-compose up -d

# Check infrastructure status
docker-compose ps

# View logs
docker-compose logs -f mongodb

# Stop infrastructure
docker-compose down

# Start all services
./scripts/start-all-services.sh

# Stop all services
./scripts/stop-all-services.sh
```

## Resources

- [Go Documentation](https://go.dev/doc/)
- [gRPC Go](https://grpc.io/docs/languages/go/)
- [MongoDB Go Driver](https://pkg.go.dev/go.mongodb.org/mongo-driver)
- [NATS Documentation](https://docs.nats.io/)
- [GraphQL with gqlgen](https://gqlgen.com/)
