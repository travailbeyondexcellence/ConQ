# Conq - Social Media Content Pipeline Manager

A comprehensive social media management platform for creating, scheduling, and publishing content across multiple platforms.

## 🚀 Features

- **Multi-Platform Support**: YouTube, Instagram, TikTok, Facebook, LinkedIn, Twitter
- **Content Management**: Create, edit, and organize content with drafts
- **Smart Scheduling**: Schedule posts with timezone support and optimal timing
- **Approval Workflows**: Team collaboration with approval processes
- **Analytics Dashboard**: Track performance across all platforms
- **Media Management**: Upload and process images and videos
- **Team Collaboration**: Multiple users, roles, and workspaces

## 🏗️ Architecture

### Microservices Backend (Go)

- **API Gateway** (8080): GraphQL endpoint for frontends
- **Auth Service** (50051): Authentication & JWT
- **User Service** (50052): User & team management
- **Content Service** (50053): Content CRUD
- **Scheduler Service** (50054): Post scheduling
- **Publisher Service** (50055): Platform publishing
- **Media Service** (50056): Media upload & processing
- **Approval Service** (50057): Approval workflows
- **Analytics Service** (50058): Performance tracking
- **Notification Service** (50059): Notifications
- **Platform Connectors** (50061-50066): Social platform integrations

### Frontend Applications

- **Web** (Next.js 16 + React 19 + Bun)
- **Android** (Kotlin + Jetpack Compose)
- **iOS** (Swift + SwiftUI)

### Infrastructure

- **MongoDB**: Primary database
- **Redis**: Cache & distributed locking
- **NATS**: Message queue for events
- **MinIO**: S3-compatible object storage

## 📁 Project Structure

```
conq/
├── frontend/
│   ├── web/              # Next.js web app (Port 3000)
│   ├── android/          # Android app (Kotlin)
│   └── ios/              # iOS app (Swift)
│
├── backend/
│   ├── api-gateway/      # GraphQL gateway (Port 8080)
│   ├── services/         # Microservices (Ports 50051-50066)
│   ├── shared/           # Shared code & protos
│   └── scripts/          # Management scripts
│
├── Project_Docs/         # Documentation
├── docker-compose.yml    # Infrastructure setup
└── README.md            # This file
```

## 🚦 Quick Start

### Prerequisites

- **Go** 1.21+
- **Node.js** 20+ (or Bun)
- **Docker** & Docker Compose
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### 1. Start Infrastructure

```bash
# Start MongoDB, Redis, NATS, MinIO
docker-compose up -d

# Verify services are running
docker-compose ps
```

Access infrastructure:
- MongoDB UI: http://localhost:8081 (admin/password)
- NATS Monitor: http://localhost:8222
- MinIO Console: http://localhost:9001 (minioadmin/minioadmin)

### 2. Start Backend Services

```bash
cd backend

# Install dependencies for each service
cd api-gateway && go mod download && cd ..
cd services/auth-service && go mod download && cd ../..
cd services/content-service && go mod download && cd ../..

# Start all services
./scripts/start-all-services.sh
```

Backend will be available at:
- GraphQL API: http://localhost:8080/graphql
- Health Check: http://localhost:8080/health

### 3. Start Frontend

#### Web Application

```bash
cd frontend/web

# Install dependencies with Bun
bun install

# Create environment file
cp .env.local.example .env.local

# Start development server
bun run dev
```

Access at: http://localhost:3000

#### Android

```bash
cd frontend/android
# Open in Android Studio
# Run on emulator or device
```

#### iOS

```bash
cd frontend/ios
# Open in Xcode
# Run on simulator or device
```

## 🔧 Development

### Backend Development

Each service is independent:

```bash
cd backend/services/content-service
go run main.go
```

### Frontend Development

```bash
cd frontend/web
bun run dev
```

Hot reload is enabled for rapid development.

### Adding a New Service

1. Create service directory
2. Initialize Go module
3. Implement gRPC server
4. Add to start script

See `backend/README.md` for details.

## 📚 Documentation

- [Architecture](./Project_Docs/ARCHITECTURE.md) - System design
- [Project Summary](./Project_Docs/PROJECT_SUMMARY.md) - Complete overview
- [File Structure](./Project_Docs/FILE_STRUCTURE.md) - Project organization
- [Go Dependencies](./Project_Docs/GO_DEPENDENCIES.md) - Backend packages
- [Quick Start](./Project_Docs/QUICK_START.md) - Fast onboarding

Service-specific READMEs:
- `backend/api-gateway/README.md`
- `backend/services/*/README.md`
- `frontend/web/README.md`
- `frontend/android/README.md`
- `frontend/ios/README.md`

## 🛠️ Tech Stack

### Backend
- **Language**: Go 1.21+
- **API**: GraphQL (gqlgen)
- **RPC**: gRPC + Protocol Buffers
- **Message Queue**: NATS
- **Database**: MongoDB
- **Cache**: Redis
- **Storage**: MinIO/S3

### Frontend
- **Web**: Next.js 16, React 19, TypeScript, Tailwind CSS, Bun
- **Android**: Kotlin, Jetpack Compose, Material 3
- **iOS**: Swift, SwiftUI, Combine

### DevOps
- **Containers**: Docker, Docker Compose
- **Orchestration**: Kubernetes (optional)
- **CI/CD**: GitHub Actions (to be added)

## 🔐 Environment Variables

### Backend Services

```bash
# Service config
GRPC_PORT=5005X
SERVICE_NAME=service-name

# MongoDB
MONGO_URI=mongodb://admin:password@localhost:27017
DB_NAME=conq

# NATS
NATS_URL=nats://localhost:4222

# Redis
REDIS_URI=redis://localhost:6379

# MinIO
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

# JWT (Auth Service)
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h
```

### Frontend

```bash
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/graphql
```

## 🧪 Testing

### Backend

```bash
cd backend/services/auth-service
go test ./...
```

### Frontend

```bash
cd frontend/web
bun test
```

## 📊 Monitoring

- **Health Checks**: Each service exposes `/health` endpoint
- **Logs**: Structured JSON logging
- **Metrics**: Prometheus-compatible metrics (to be implemented)
- **Tracing**: OpenTelemetry support (to be implemented)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 🚀 Deployment

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

Helm charts available in `infra/k8s/` (to be added)

### Cloud Platforms

- AWS: ECS/EKS + RDS + ElastiCache
- GCP: GKE + Cloud SQL + Memorystore
- Azure: AKS + Cosmos DB + Redis Cache

## 📝 License

This project is proprietary and confidential.

## 👥 Team

- Backend: Go microservices
- Frontend: Web, Android, iOS teams
- DevOps: Infrastructure & deployment

## 📞 Support

- Documentation: `/Project_Docs`
- Issues: GitHub Issues
- Team Chat: [Your team chat link]

## 🎯 Roadmap

### Phase 1 (MVP)
- [x] Project setup
- [ ] User authentication
- [ ] Content creation
- [ ] Basic scheduling
- [ ] Instagram & Facebook publishing

### Phase 2
- [ ] Multi-user teams
- [ ] Approval workflows
- [ ] Analytics dashboard
- [ ] All platform connectors

### Phase 3
- [ ] AI content suggestions
- [ ] A/B testing
- [ ] Advanced analytics
- [ ] White-labeling

---

**Built with ❤️ for social media managers**
