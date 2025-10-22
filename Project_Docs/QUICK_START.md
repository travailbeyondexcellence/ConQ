# Conq - Quick Start Guide for New Developers

Welcome to the Conq team! This guide will get you up and running quickly.

## What is Conq?

Conq is a social media content pipeline manager similar to Buffer. It allows users to:
- Create and edit content
- Schedule posts to multiple platforms
- Manage approval workflows
- Analyze post performance
- Collaborate with teams

## Technology Overview

### Frontend
- **Web**: Next.js 15 (React 19 + TypeScript)
- **Mobile**: Native apps (Kotlin for Android, Swift for iOS)
- **API Communication**: GraphQL

### Backend
- **Language**: Go (Golang)
- **Architecture**: Microservices
- **Inter-service Communication**: gRPC + NATS
- **Database**: MongoDB
- **Cache**: Redis
- **Object Storage**: MinIO (S3-compatible)

## 5-Minute Setup

### 1. Prerequisites Check

```bash
# Check Go
go version  # Should be 1.21+

# Check Node.js
node --version  # Should be 20+

# Check Docker
docker --version
docker-compose --version
```

### 2. Clone and Start Infrastructure

```bash
# Clone the repo
git clone <repo-url>
cd conq

# Start MongoDB, Redis, NATS, MinIO
docker-compose up -d

# Verify
docker-compose ps
```

### 3. Start Backend Services

```bash
cd backend
./scripts/start-all-services.sh
```

### 4. Start Web Frontend

```bash
cd frontend/web
npm install
npm run dev
```

### 5. Open in Browser

- **Web App**: http://localhost:3000
- **GraphQL Playground**: http://localhost:8080

## Project Structure

```
conq/
├── frontend/
│   ├── web/          # Next.js web app
│   ├── android/      # Android app (Kotlin)
│   └── ios/          # iOS app (Swift)
│
├── backend/
│   ├── api-gateway/              # GraphQL API Gateway
│   ├── services/                 # Microservices
│   │   ├── auth-service/         # Authentication
│   │   ├── user-service/         # User management
│   │   ├── content-service/      # Content CRUD
│   │   ├── scheduler-service/    # Post scheduling
│   │   ├── publisher-service/    # Post publishing
│   │   └── ...                   # Other services
│   └── shared/                   # Shared code & protos
│
├── docs/                         # Documentation
├── infra/                        # Infrastructure configs
└── docker-compose.yml            # Local dev environment
```

## Understanding the System

### Data Flow: Creating a Scheduled Post

1. User creates content in web UI
2. Web sends GraphQL mutation to API Gateway
3. API Gateway calls Content Service (gRPC)
4. Content Service saves to MongoDB
5. Content Service publishes event to NATS (`content.created`)
6. User schedules the post
7. Scheduler Service saves schedule and queues job
8. At scheduled time, Scheduler triggers Publisher
9. Publisher posts to social platforms
10. Analytics Service tracks performance

### Communication Patterns

**GraphQL** (Frontend ↔ API Gateway)
```
Web/Mobile → [GraphQL/HTTP] → API Gateway
```

**gRPC** (Synchronous service-to-service)
```
API Gateway → [gRPC] → Auth Service
API Gateway → [gRPC] → Content Service
```

**NATS** (Asynchronous events)
```
Content Service → [NATS: content.created] → Other Services
```

## Key Concepts

### Microservices

Each service has a specific responsibility:
- **Auth Service**: Login, JWT tokens
- **Content Service**: Content CRUD, drafts, tags
- **Scheduler Service**: Scheduling, queues, cron jobs
- **Publisher Service**: Posts to social platforms

### Protocol Buffers

Services communicate via gRPC using Protocol Buffers:

```protobuf
service ContentService {
  rpc CreateContent(CreateContentRequest) returns (ContentResponse);
  rpc GetContent(GetContentRequest) returns (ContentResponse);
}
```

### NATS Events

Services publish/subscribe to events:

```go
// Publishing
natsConn.Publish("content.created", contentData)

// Subscribing
natsConn.Subscribe("content.created", handleContentCreated)
```

## Development Workflow

### Working on Frontend

```bash
cd frontend/web

# Make changes to files
# Hot reload automatically updates browser

npm run dev
```

### Working on Backend Service

```bash
cd backend/services/content-service

# Make changes
# Restart service to see changes

go run main.go
```

### Adding a New Feature

1. **Define API Contract**
   - Add GraphQL schema (if client-facing)
   - Add protobuf definition (if service-to-service)

2. **Implement Backend**
   - Add handler in appropriate service
   - Add database operations
   - Publish NATS events if needed

3. **Implement Frontend**
   - Add GraphQL query/mutation
   - Create UI components
   - Handle state

4. **Test**
   - Write unit tests
   - Manual testing
   - Integration tests

## Common Tasks

### View MongoDB Data

```bash
# Using Mongo Express web UI
open http://localhost:8081

# Or using mongosh
mongosh "mongodb://admin:password@localhost:27017"
use conq
db.contents.find().pretty()
```

### View NATS Messages

```bash
# NATS monitoring
open http://localhost:8222

# Or use nats CLI
nats sub ">"  # Subscribe to all subjects
```

### View Service Logs

```bash
# View all logs
tail -f backend/logs/*.log

# View specific service
tail -f backend/logs/content-service.log
```

### Restart a Service

```bash
# Find PID
cat backend/logs/content-service.pid

# Kill process
kill <PID>

# Restart
cd backend/services/content-service
go run main.go
```

## Helpful Resources

### Documentation
- [Architecture](./docs/ARCHITECTURE.md) - System design and architecture
- [Development Setup](./docs/DEVELOPMENT_SETUP.md) - Detailed setup guide
- Service READMEs in each service directory

### Tools & UIs
- GraphQL Playground: http://localhost:8080
- MongoDB UI: http://localhost:8081
- NATS Monitor: http://localhost:8222
- MinIO Console: http://localhost:9001

### Code Locations

| Task | Location |
|------|----------|
| GraphQL Schema | `backend/api-gateway/graph/schema.graphql` |
| Proto Definitions | `backend/shared/proto/` |
| Frontend Pages | `frontend/web/app/` |
| Service Logic | `backend/services/<service-name>/` |

## Troubleshooting

### "Port already in use"
```bash
# Find and kill process
lsof -ti:8080 | xargs kill -9
```

### "Cannot connect to MongoDB"
```bash
# Restart MongoDB
docker-compose restart mongodb

# Check logs
docker logs conq-mongodb
```

### "gRPC service not responding"
```bash
# Check if service is running
ps aux | grep <service-name>

# Check service logs
tail -f backend/logs/<service-name>.log
```

### "Frontend not loading"
```bash
# Clear Next.js cache
cd frontend/web
rm -rf .next
npm run dev
```

## Next Steps

1. Read [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed system design
2. Pick a task from the issue tracker
3. Ask questions in team chat
4. Review code from other PRs to learn patterns

## Getting Help

- **Documentation**: `/docs` folder
- **Team Chat**: [Slack/Discord link]
- **Code Questions**: Ask in #dev channel
- **Bugs**: Create GitHub issue

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push branch: `git push origin feature/your-feature`
4. Create Pull Request
5. Address review feedback
6. Merge after approval

Welcome aboard! 🚀
