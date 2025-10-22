# Conq Backend Architecture

## Overview

Conq uses a **microservices architecture** with the following key components:

- **API Gateway**: GraphQL gateway for frontend communication
- **Microservices**: Domain-specific services (auth, content, scheduler, etc.)
- **Message Queue**: NATS for async event-driven communication
- **RPC**: gRPC for synchronous inter-service communication
- **Database**: MongoDB for data persistence
- **Cache**: Redis for caching and distributed locking

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontends                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Next.js  │  │  Kotlin  │  │  Swift   │                  │
│  │   Web    │  │  Android │  │   iOS    │                  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                  │
│       │             │              │                         │
│       └─────────────┼──────────────┘                         │
│                     │ GraphQL                                │
└─────────────────────┼────────────────────────────────────────┘
                      │
              ┌───────▼────────┐
              │  API Gateway   │ (GraphQL)
              │    (Port 8080) │
              └───────┬────────┘
                      │ gRPC calls
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐
│ Auth Service │ │  User    │ │   Content    │
│  (50051)     │ │ Service  │ │   Service    │
└──────┬───────┘ │ (50052)  │ │   (50053)    │
       │         └────┬─────┘ └──────┬───────┘
       │              │              │
       │         ┌────▼──────────────▼───┐
       └────────►│    NATS Message Bus   │◄───────┐
                 │   (Event Streaming)    │        │
                 └────┬──────────────┬────┘        │
                      │              │             │
        ┌─────────────▼───┐    ┌────▼─────────┐   │
        │   Scheduler     │    │  Publisher   │   │
        │   Service       │    │  Service     │   │
        │   (50054)       │────┤  (50055)     │   │
        └─────────────────┘    └──────┬───────┘   │
                                      │           │
                      ┌───────────────▼───────────▼──────┐
                      │    Platform Connectors            │
                      │  (YouTube, Instagram, TikTok...)  │
                      └───────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Infrastructure                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ MongoDB  │  │  Redis   │  │  NATS    │  │  MinIO   │   │
│  │  (27017) │  │  (6379)  │  │  (4222)  │  │  (9000)  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Communication Patterns

### 1. Frontend ↔ Backend (GraphQL)

**Protocol**: GraphQL over HTTP/HTTPS  
**Port**: 8080 (API Gateway)

- Frontends make GraphQL queries/mutations
- API Gateway routes to appropriate microservices via gRPC
- Single endpoint for all frontend needs
- Real-time updates via GraphQL subscriptions (WebSocket)

### 2. Inter-Service Communication (gRPC)

**Protocol**: gRPC (Protocol Buffers)  
**Use Case**: Synchronous request-response

Example flow:
```
API Gateway → Auth Service (Verify JWT)
API Gateway → Content Service (Create content)
Scheduler Service → Publisher Service (Trigger post)
```

**Benefits**:
- Type-safe communication
- High performance (binary protocol)
- Built-in service discovery support
- Streaming support

### 3. Event-Driven Communication (NATS)

**Protocol**: NATS messaging  
**Use Case**: Asynchronous events, pub-sub

Example events:
```
content.created       → Published when content is created
content.updated       → Published when content is modified
scheduler.triggered   → Published when it's time to post
publisher.completed   → Published after successful post
publisher.failed      → Published when posting fails
user.created          → Published when new user signs up
```

**NATS Subjects Pattern**:
```
<service>.<entity>.<action>

Examples:
- content.post.created
- scheduler.post.triggered
- publisher.post.completed
- analytics.metric.updated
```

## Microservices Details

### 1. Auth Service (Port 50051)

**Responsibilities**:
- User authentication (login, register)
- JWT token generation/validation
- Password hashing
- Session management

**Database**: `users` collection  
**gRPC**: AuthService  
**NATS Events**: `auth.user.login`, `auth.user.logout`

---

### 2. User Service (Port 50052)

**Responsibilities**:
- User profile management
- Team/workspace management
- Role-based access control (RBAC)
- User preferences

**Database**: `users`, `teams`, `workspaces`  
**gRPC**: UserService  
**NATS Events**: `user.created`, `user.updated`, `team.member.added`

---

### 3. Content Service (Port 50053)

**Responsibilities**:
- Content CRUD operations
- Draft management
- Tagging and categorization
- Content versioning

**Database**: `contents`, `drafts`, `tags`  
**gRPC**: ContentService  
**NATS Events**: `content.created`, `content.updated`, `content.deleted`

---

### 4. Media Service (Port 50056)

**Responsibilities**:
- Image/video upload
- Media processing (resize, optimize)
- Thumbnail generation
- Storage management (MinIO/S3)

**Database**: `media_metadata`  
**Storage**: MinIO/S3  
**gRPC**: MediaService  
**NATS Events**: `media.uploaded`, `media.processed`

---

### 5. Scheduler Service (Port 50054)

**Responsibilities**:
- Post scheduling
- Queue management
- Trigger publishing at scheduled time
- Retry failed posts

**Database**: `schedules`, `queues`  
**Cache**: Redis (for distributed locks)  
**Task Queue**: Asynq (Redis-backed)  
**gRPC**: SchedulerService  
**NATS Events**: `scheduler.post.scheduled`, `scheduler.post.triggered`

---

### 6. Publisher Service (Port 50055)

**Responsibilities**:
- Publish posts to social platforms
- Handle platform-specific formatting
- Manage API rate limits
- Track publishing status

**Database**: `publishing_logs`  
**gRPC**: PublisherService  
**NATS Events**: `publisher.post.completed`, `publisher.post.failed`

---

### 7. Platform Connectors

**Individual services for each platform**:
- YouTube Connector (Port 50061)
- Instagram Connector (Port 50062)
- TikTok Connector (Port 50063)
- Facebook Connector (Port 50064)
- LinkedIn Connector (Port 50065)
- Twitter Connector (Port 50066)

Each connector:
- Implements platform-specific OAuth flows
- Handles API calls to platform
- Manages rate limiting
- Formats content for platform requirements

---

### 8. Approval Service (Port 50057)

**Responsibilities**:
- Approval workflow management
- Role permissions
- Content approval states (draft → pending → approved)

**Database**: `approval_workflows`, `approvals`  
**gRPC**: ApprovalService  
**NATS Events**: `approval.requested`, `approval.approved`, `approval.rejected`

---

### 9. Analytics Service (Port 50058)

**Responsibilities**:
- Collect post performance metrics
- Aggregate analytics data
- Generate reports
- Track engagement (likes, shares, comments)

**Database**: `analytics`, `metrics`  
**gRPC**: AnalyticsService  
**NATS Events**: `analytics.metric.recorded`

---

### 10. Notification Service (Port 50059)

**Responsibilities**:
- Email notifications
- Push notifications (mobile)
- In-app notifications
- Notification preferences

**Database**: `notifications`, `notification_preferences`  
**gRPC**: NotificationService  
**NATS Subscriptions**: All critical events that need user notification

---

## Data Flow Examples

### Example 1: Creating and Scheduling a Post

```
1. User creates post in Web UI
   ↓
2. Web → API Gateway (GraphQL mutation)
   ↓
3. API Gateway → Content Service (gRPC CreateContent)
   ↓
4. Content Service:
   - Saves to MongoDB
   - Publishes NATS event: content.created
   ↓
5. User schedules post
   ↓
6. Web → API Gateway (GraphQL mutation)
   ↓
7. API Gateway → Scheduler Service (gRPC SchedulePost)
   ↓
8. Scheduler Service:
   - Saves schedule to MongoDB
   - Enqueues task in Redis (Asynq)
   - Publishes NATS event: scheduler.post.scheduled
   ↓
9. When scheduled time arrives:
   - Asynq worker triggers
   - Scheduler → Publisher Service (gRPC TriggerPublish)
   - Publishes NATS event: scheduler.post.triggered
   ↓
10. Publisher Service:
    - Calls appropriate Platform Connector
    - Posts to social media
    - Publishes NATS event: publisher.post.completed
    ↓
11. Analytics Service (subscribing to publisher.post.completed):
    - Records publishing event
    - Starts tracking metrics
```

### Example 2: Approval Workflow

```
1. User creates draft
   ↓
2. Content Service → NATS: content.created (status=draft)
   ↓
3. User submits for approval
   ↓
4. Approval Service:
   - Creates approval request
   - Publishes NATS: approval.requested
   ↓
5. Notification Service (subscribed to approval.requested):
   - Sends notification to managers
   ↓
6. Manager approves
   ↓
7. Approval Service:
   - Updates approval status
   - Publishes NATS: approval.approved
   ↓
8. Content Service (subscribed to approval.approved):
   - Updates content status to "approved"
   - Now available for scheduling
```

## Technology Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Language** | Go 1.21+ | Backend services |
| **API Gateway** | Custom Go + gqlgen | GraphQL gateway |
| **RPC** | gRPC + Protocol Buffers | Inter-service sync communication |
| **Message Queue** | NATS | Event-driven async communication |
| **Database** | MongoDB | Primary data store |
| **Cache** | Redis | Caching, distributed locks |
| **Task Queue** | Asynq (Redis) | Scheduled jobs |
| **Object Storage** | MinIO/S3 | Media files |
| **Orchestration** | Docker Compose / K8s | Container orchestration |

## Port Assignments

| Service | gRPC Port | HTTP Port (if any) |
|---------|-----------|-------------------|
| API Gateway | - | 8080 |
| Auth Service | 50051 | - |
| User Service | 50052 | - |
| Content Service | 50053 | - |
| Scheduler Service | 50054 | - |
| Publisher Service | 50055 | - |
| Media Service | 50056 | - |
| Approval Service | 50057 | - |
| Analytics Service | 50058 | - |
| Notification Service | 50059 | - |
| Platform Connectors | 50061-50066 | - |

## Environment Variables

Each service requires:
```bash
GRPC_PORT=5005X
MONGO_URI=mongodb://admin:password@localhost:27017
NATS_URL=nats://localhost:4222
REDIS_URI=redis://localhost:6379  # (if needed)
DB_NAME=conq
```

## Running the System

### Option 1: Docker Compose (Recommended for development)

```bash
# Start infrastructure
docker-compose up -d

# Start all services
./scripts/start-all-services.sh
```

### Option 2: Kubernetes (Production)

```bash
kubectl apply -f infra/k8s/
```

## Security Considerations

1. **Authentication**: JWT tokens in Authorization header
2. **Authorization**: Role-based access control (RBAC)
3. **Encryption**: TLS for gRPC, HTTPS for API Gateway
4. **Secrets**: Environment variables, never hardcoded
5. **Rate Limiting**: Per-user and per-endpoint limits
6. **Input Validation**: All inputs validated at API Gateway

## Scalability

- **Horizontal Scaling**: All services are stateless and can scale horizontally
- **Database**: MongoDB sharding for large datasets
- **Caching**: Redis for frequently accessed data
- **Message Queue**: NATS JetStream for persistence and replay
- **Load Balancing**: Kubernetes service load balancing

## Monitoring & Observability

- **Logs**: Structured JSON logging
- **Metrics**: Prometheus metrics exposed by each service
- **Tracing**: OpenTelemetry for distributed tracing
- **Health Checks**: `/health` and `/ready` endpoints

## Future Enhancements

- [ ] API rate limiting per user/team
- [ ] Webhook support for platform events
- [ ] AI-powered content suggestions
- [ ] A/B testing for post variants
- [ ] Advanced analytics ML models
- [ ] Multi-tenancy support
- [ ] Audit logging
