# ConQ Backend Architecture Analysis
## Comprehensive Review for KEDA & Terraform Integration

**Date:** October 23, 2025
**Status:** Completed
**Focus:** Microservices Architecture, Service Organization, Deployment Configuration

---

## Executive Summary

ConQ is a **Go-based microservices platform** for managing and scheduling social media content across multiple platforms. The architecture employs:

- **11 Microservices** + 1 API Gateway + 6 Platform Connectors
- **gRPC** for inter-service communication
- **GraphQL** for external API
- **MongoDB** for persistence
- **Redis** for caching/sessions
- **NATS** for event-driven architecture
- **MinIO** for object storage

**Current Status:** Foundation complete, infrastructure ready for containerization and Kubernetes deployment.

---

## 1. MICROSERVICES ARCHITECTURE

### 1.1 Core Services

```
┌─────────────────────────────────────────────────────────────────┐
│                         API Gateway (8080)                      │
│              GraphQL Endpoint + Request Router                  │
└─────────────────────────────────────────────────────────────────┘
         │           │           │           │           │
         ↓           ↓           ↓           ↓           ↓
    ┌────────────┬────────────┬────────────┬────────────┬──────────┐
    │   Auth     │   User     │  Content   │ Scheduler  │ Publisher│
    │ (50051)    │  (50052)   │  (50053)   │  (50054)   │ (50055)  │
    └────────────┴────────────┴────────────┴────────────┴──────────┘
         │           │           │           │           │
         └───────────┴───────────┴───────────┴───────────┴──────────┐
                                                                    │
    ┌─────────────┬─────────────┬──────────────┬────────────────────┘
    │   Media     │  Approval   │  Analytics   │
    │  (50056)    │  (50057)    │  (50058)     │
    └─────────────┴─────────────┴──────────────┘
         │
    ┌────┴────────────────────────────────────────────────────────┐
    │          Notification Service (50059)                       │
    └────┬───────────────────────────────────────────────────────┘
         │
    ┌────┴────────────────────────────────────────────────────────┐
    │    Platform Connectors (50061-50066)                        │
    │    ├─ YouTube (50061)                                       │
    │    ├─ Instagram (50062)                                     │
    │    ├─ TikTok (50063)                                        │
    │    ├─ Facebook (50064)                                      │
    │    ├─ LinkedIn (50065)                                      │
    │    └─ Twitter (50066)                                       │
    └────────────────────────────────────────────────────────────┘
```

### 1.2 Service Details

| Service | Port | Repo Path | Status | Key Responsibilities |
|---------|------|-----------|--------|----------------------|
| API Gateway | 8080 | `/backend/api-gateway/` | Basic | GraphQL endpoint, request routing |
| Auth Service | 50051 | `/backend/services/auth-service/` | ✅ Complete | JWT, registration, login, validation |
| User Service | 50052 | `/backend/services/user-service/` | 🏗️ Structure | User profiles, teams, RBAC |
| Content Service | 50053 | `/backend/services/content-service/` | 🏗️ Structure | Content CRUD, drafts, tagging |
| Scheduler Service | 50054 | `/backend/services/scheduler-service/` | 🏗️ Structure | Post scheduling, queue management |
| Publisher Service | 50055 | `/backend/services/publisher-service/` | 🏗️ Structure | Platform publishing, rate limiting |
| Media Service | 50056 | `/backend/services/media-service/` | 🏗️ Structure | Upload, processing, thumbnail gen |
| Approval Service | 50057 | `/backend/services/approval-service/` | 🏗️ Structure | Approval workflows, permissions |
| Analytics Service | 50058 | `/backend/services/analytics-service/` | 🏗️ Structure | Metrics, performance tracking |
| Notification Service | 50059 | `/backend/services/notification-service/` | 🏗️ Structure | Email, push notifications |
| YouTube Connector | 50061 | `/backend/services/platform-connectors/youtube/` | 🏗️ Structure | YouTube API integration |
| Instagram Connector | 50062 | `/backend/services/platform-connectors/instagram/` | 🏗️ Structure | Instagram API integration |
| TikTok Connector | 50063 | `/backend/services/platform-connectors/tiktok/` | 🏗️ Structure | TikTok API integration |
| Facebook Connector | 50064 | `/backend/services/platform-connectors/facebook/` | 🏗️ Structure | Facebook API integration |
| LinkedIn Connector | 50065 | `/backend/services/platform-connectors/linkedin/` | 🏗️ Structure | LinkedIn API integration |
| Twitter Connector | 50066 | `/backend/services/platform-connectors/twitter/` | 🏗️ Structure | Twitter/X API integration |

---

## 2. SERVICE ORGANIZATION

### 2.1 Standard Service Structure

Each service follows a consistent pattern for maintainability and scalability:

```
service-name/
├── main.go                          # Entry point with gRPC server setup
├── go.mod                           # Go module dependencies
├── go.sum                           # Dependency checksums
├── README.md                        # Service documentation
│
├── config/
│   └── config.go                    # Service configuration & env loading
│
├── handlers/
│   ├── {service}_handler.go         # HTTP/gRPC request handlers
│   └── grpc_handler.go              # gRPC server implementation
│
├── models/
│   ├── {entity}.go                  # Data models
│   └── requests.go                  # Request/response types
│
├── repository/
│   └── {entity}_repository.go       # Database operations (MongoDB)
│
└── service/
    └── {service}_service.go         # Business logic layer
```

### 2.2 Shared Code Organization

```
shared/
├── go.mod                           # Shared module definition
├── config/
│   ├── env.go                       # Environment variable helpers
│   ├── mongo.go                     # MongoDB connection management
│   ├── redis.go                     # Redis connection management
│   └── nats.go                      # NATS connection management
│
├── utils/
│   ├── logger.go                    # Structured logging (zerolog)
│   ├── validator.go                 # Input validation functions
│   ├── middleware.go                # gRPC interceptors
│   └── response.go                  # Common response helpers
│
└── proto/
    ├── auth.proto                   # Auth service definitions
    ├── auth.pb.go                   # Generated auth code
    ├── auth_grpc.pb.go              # Generated auth gRPC code
    ├── common.proto                 # Common message types
    └── common.pb.go                 # Generated common code
```

### 2.3 API Gateway Structure

```
api-gateway/
├── main.go                          # Entry point (HTTP server with GraphQL)
├── go.mod
├── go.sum
├── gqlgen.yml                       # GraphQL code generation config
│
├── client/
│   └── auth_client.go               # gRPC client for auth service
│
└── graph/
    ├── schema.graphql               # GraphQL schema definitions
    ├── resolvers.go                 # GraphQL resolver implementations
    ├── generated/                   # Generated GraphQL code
    └── ...
```

---

## 3. EXISTING INFRASTRUCTURE & DEPLOYMENT

### 3.1 Docker Compose Setup

**Location:** `/home/zenith/Desktop/Code/ConQ/docker-compose.yml`

Defines the complete local development infrastructure:

```yaml
Services:
├── MongoDB (27017)        # Primary database
│   └── mongo-express (8081) # Web UI admin console
├── Redis (6379)           # Caching & session store
├── NATS (4222, 8222)      # Message broker with JetStream
└── MinIO (9000, 9001)     # S3-compatible object storage
```

**Current State:**
- All containers use volume mounts for data persistence
- Network: `conq-network` (bridge)
- Development-grade credentials (admin/password, minioadmin/minioadmin)
- No Kubernetes manifests yet

### 3.2 Service Startup Scripts

**Location:** `/backend/scripts/`

#### start-all-services.sh
- Starts all services sequentially
- Checks port availability before starting
- Logs output to `./logs/{service}.log`
- Creates PID files for process tracking
- Supports both core services and platform connectors

#### stop-all-services.sh
- Gracefully stops all running services
- Reads PID files to kill processes

**Current Limitations:**
- Shell script based (no Docker/K8s)
- No health checks
- No dependency management
- Local-only deployment

### 3.3 Environment Configuration

Each service uses environment variables (no config files):

```bash
# Service Config
GRPC_PORT=5005X              # Service-specific port
SERVICE_NAME={service-name}   # Service identifier
ENV=development              # Environment (dev/staging/prod)
LOG_LEVEL=info              # Logging level

# Shared Infrastructure
MONGO_URI=mongodb://admin:password@localhost:27017
DB_NAME=conq
NATS_URL=nats://localhost:4222
REDIS_URI=redis://localhost:6379

# Service-Specific
JWT_SECRET={secret}         # Auth service
JWT_EXPIRY=24h
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
```

**Configuration Pattern:**
- Environment variables with defaults in `shared/config/env.go`
- Service-specific config loaded in `service/config/config.go`
- No ConfigMaps or environment-specific files

---

## 4. GO WORKSPACE CONFIGURATION

**Location:** `/backend/go.work`

```go
go 1.24.0
toolchain go1.24.9

use (
    ./api-gateway
    ./services/auth-service
    ./shared
)
```

**Current Issue:** Only 3 modules included. Should include all services for unified workspace.

**Recommended Update:**
```go
use (
    ./api-gateway
    ./services/auth-service
    ./services/user-service
    ./services/content-service
    ./services/scheduler-service
    ./services/publisher-service
    ./services/media-service
    ./services/approval-service
    ./services/analytics-service
    ./services/notification-service
    ./services/platform-connectors/youtube
    ./services/platform-connectors/instagram
    ./services/platform-connectors/tiktok
    ./services/platform-connectors/facebook
    ./services/platform-connectors/linkedin
    ./services/platform-connectors/twitter
    ./shared
)
```

---

## 5. COMMUNICATION PATTERNS

### 5.1 Frontend ↔ Backend (GraphQL)

```
Client Application
    ↓ (GraphQL over HTTP)
API Gateway (8080)
    ├─ Validates request
    ├─ Authenticates (JWT)
    └─ Calls gRPC services
```

**Endpoints:**
- `POST /graphql` - GraphQL mutations and queries
- `GET /playground` - GraphQL IDE
- `GET /health` - Health check
- `GET /` - Root endpoint

### 5.2 Inter-Service Communication (gRPC)

```
API Gateway
    ├─ gRPC → Auth Service (50051)
    ├─ gRPC → User Service (50052)
    ├─ gRPC → Content Service (50053)
    │   └─ gRPC → Media Service (50056)
    ├─ gRPC → Scheduler Service (50054)
    ├─ gRPC → Publisher Service (50055)
    │   └─ gRPC → Platform Connectors (50061-66)
    ├─ gRPC → Approval Service (50057)
    ├─ gRPC → Analytics Service (50058)
    └─ gRPC → Notification Service (50059)
```

**Protocol Buffers Location:** `/backend/shared/proto/`

**Current Proto Files:**
- `auth.proto` - Auth service definition
- `common.proto` - Shared message types

**Generated Code:**
- `auth.pb.go` - Auth messages
- `auth_grpc.pb.go` - Auth gRPC service
- `common.pb.go` - Common messages

### 5.3 Event-Driven Architecture (NATS)

```
Service A → NATS Subject → Service B Listener
            (JSON Event)

Examples:
- auth.user.registered
- auth.user.login
- content.post.created
- scheduler.post.scheduled
- publisher.post.completed
```

**NATS Configuration:**
- URL: `nats://localhost:4222`
- JetStream enabled
- Monitoring on port 8222

---

## 6. DATABASE ORGANIZATION

### 6.1 MongoDB

**Connection:** `mongodb://admin:password@localhost:27017`
**Database:** `conq`

**Collections:**
- `users` - User accounts and profiles
- `refresh_tokens` - Token storage
- `teams` - Team/workspace data
- `content` - Posts and content items
- Additional collections per service (TBD)

**Current State:**
- No schema validation
- No indexes defined
- No backup strategy
- Development credentials hardcoded

### 6.2 Redis

**Connection:** `redis://localhost:6379`

**Usage:**
- Token blacklist
- Rate limiting
- Session caching
- Distributed locks

**Current Keys Pattern:**
```
blacklist:access_token:{jti}
blacklist:refresh_token:{jti}
rate_limit:login:{ip}
lockout:{user_id}
```

### 6.3 MinIO

**API:** `localhost:9000`
**Console:** `localhost:9001`
**Credentials:** minioadmin/minioadmin

**Purpose:**
- Media file storage
- S3-compatible interface
- Development environment

---

## 7. OBSERVABILITY & MONITORING

### 7.1 Logging

**Implementation:** `shared/utils/logger.go`
- **Library:** zerolog (structured JSON logging)
- **Format:** JSON for machine parsing
- **Levels:** debug, info, warn, error, fatal

**Integration Points:**
- Each service initializes logger in main()
- gRPC interceptor for request/response logging
- All errors logged with context

**Current Gaps:**
- No log aggregation (ELK, Loki, etc.)
- No log shipping
- No correlation IDs across services

### 7.2 Health Checks

**Implemented:**
- `/health` endpoint in API Gateway
- Returns JSON: `{"status":"healthy"}`

**Not Implemented:**
- Per-service health endpoints
- Readiness probes
- Liveness probes
- Dependency health checks

### 7.3 Metrics

**Current State:** None implemented

**Needed for KEDA:**
- CPU usage per pod
- Memory usage per pod
- Custom metrics (requests/sec, queue depth)
- Response times

---

## 8. EXISTING CONFIGURATION PATTERNS

### 8.1 Main.go Pattern (Standard)

All services follow this pattern:

```go
func main() {
    // 1. Load config from environment
    cfg := config.LoadConfig()
    
    // 2. Initialize logger
    utils.InitLogger(cfg.ServiceName)
    
    // 3. Connect to MongoDB
    mongoClient := sharedConfig.ConnectMongo(...)
    defer sharedConfig.DisconnectMongo(mongoClient)
    
    // 4. Connect to NATS
    natsConn := sharedConfig.ConnectNATS(...)
    defer sharedConfig.DisconnectNATS(natsConn)
    
    // 5. Create gRPC server with interceptors
    grpcServer := grpc.NewServer(
        grpc.ChainUnaryInterceptor(
            utils.RecoveryInterceptor(),
            utils.LoggingInterceptor(cfg.ServiceName),
        ),
    )
    
    // 6. Register service
    pb.RegisterServiceServer(grpcServer, handler)
    
    // 7. Listen on port
    lis, err := net.Listen("tcp", ":"+cfg.GRPCPort)
    
    // 8. Start server
    go func() {
        grpcServer.Serve(lis)
    }()
    
    // 9. Graceful shutdown
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit
    grpcServer.GracefulStop()
}
```

### 8.2 Config Loading Pattern

Each service has a config package:

```go
type Config struct {
    ServiceName string
    GRPCPort    string
    MongoURI    string
    MongoDBName string
    NATSURL     string
    // Service-specific fields
}

func LoadConfig() *Config {
    return &Config{
        ServiceName: GetEnv("SERVICE_NAME", "service"),
        GRPCPort:    GetEnv("GRPC_PORT", "5005X"),
        // ... load from environment
    }
}
```

**From:** `shared/config/env.go`

### 8.3 Interceptor Pattern

```go
// In middleware.go
func RecoveryInterceptor() grpc.UnaryServerInterceptor { }
func LoggingInterceptor(serviceName string) grpc.UnaryServerInterceptor { }

// Usage in main.go
grpc.ChainUnaryInterceptor(
    utils.RecoveryInterceptor(),
    utils.LoggingInterceptor(cfg.ServiceName),
)
```

---

## 9. BEST PRACTICES IDENTIFIED

### 9.1 Strengths

✅ **Consistent Service Structure**
- All services follow the same pattern
- Easy to understand and onboard
- Clear separation of concerns

✅ **Shared Configuration**
- Centralized config helpers in `shared/config/`
- Consistent environment variable handling
- Reusable connection management

✅ **Proper Middleware Integration**
- gRPC interceptors for logging, recovery
- Graceful shutdown handling
- Request/response logging

✅ **Protocol Buffer Definitions**
- Shared proto files in central location
- Clean service contracts
- Typed communication

✅ **Event-Driven Architecture**
- NATS for loose coupling
- Subject-based routing
- Scalable message patterns

### 9.2 Gaps & Improvements Needed

❌ **No Docker Configuration**
- No Dockerfiles for individual services
- No container registry references
- No multi-stage builds

❌ **No Kubernetes Manifests**
- No Deployments, Services, ConfigMaps
- No resource requests/limits
- No probes (liveness, readiness)
- No network policies

❌ **No Infrastructure as Code**
- No Terraform configurations
- No cloud provider templates
- No environment-specific configs

❌ **Limited Observability**
- No Prometheus metrics
- No distributed tracing (OpenTelemetry)
- No metrics for KEDA
- No log aggregation

❌ **No Auto-Scaling Configuration**
- No HPA definitions
- No KEDA ScaledObjects
- No metric collection

❌ **Incomplete go.work**
- Missing service modules
- Only 3 modules referenced

---

## 10. SCALING CHARACTERISTICS & WORKLOAD PATTERNS

### 10.1 Service Scaling Requirements

**High Scalability Needs (suitable for KEDA):**

1. **Scheduler Service** (Port 50054)
   - Job queue processing
   - Variable load based on scheduled posts
   - Can scale based on queue depth

2. **Publisher Service** (Port 50055)
   - Rate-limited publishing to platforms
   - Bursty traffic during scheduled times
   - Can scale based on queue and latency

3. **Notification Service** (Port 50059)
   - Async notification processing
   - Event-driven load
   - Can scale based on message queue

4. **Analytics Service** (Port 50058)
   - Bulk processing of events
   - Can scale based on event throughput

5. **Platform Connectors** (Ports 50061-50066)
   - Parallel API calls to different platforms
   - Rate-limited by external APIs
   - Can scale based on request queue

**Moderate Scalability:**

1. **Auth Service** (50051)
   - Login/register spikes during peak hours
   - Can scale on request rate

2. **Content Service** (50053)
   - CRUD operations
   - Can scale on request latency

**Lower Scalability Priority:**

1. **User Service** (50052)
   - Mostly admin operations
   - Lower throughput

2. **Approval Service** (50057)
   - Human-in-the-loop workflow
   - Lower volume

3. **Media Service** (50056)
   - Depends on file size/processing
   - May need custom metrics

4. **API Gateway** (8080)
   - Frontend gateway
   - Should scale based on incoming requests

---

## 11. RECOMMENDED DIRECTORY STRUCTURE FOR DEPLOYMENT

```
ConQ/
├── backend/
│   ├── services/
│   ├── api-gateway/
│   ├── shared/
│   │
│   ├── infra/                          # NEW: Infrastructure as Code
│   │   ├── docker/                     # Container definitions
│   │   │   ├── Dockerfile.base         # Base image with dependencies
│   │   │   └── Dockerfile.{service}    # Service-specific builds
│   │   │
│   │   ├── kubernetes/                 # K8s manifests
│   │   │   ├── base/                   # Base configurations
│   │   │   │   ├── namespace.yaml
│   │   │   │   ├── configmaps.yaml
│   │   │   │   ├── secrets.yaml
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── services/               # Service deployments
│   │   │   │   ├── auth-service/
│   │   │   │   │   ├── deployment.yaml
│   │   │   │   │   ├── service.yaml
│   │   │   │   │   ├── hpa.yaml
│   │   │   │   │   └── keda-scaler.yaml
│   │   │   │   ├── scheduler-service/
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── gateway/                # API Gateway
│   │   │   │   ├── deployment.yaml
│   │   │   │   └── service.yaml
│   │   │   │
│   │   │   └── kustomization.yaml      # Kustomize overlay
│   │   │
│   │   ├── terraform/                  # Infrastructure provisioning
│   │   │   ├── main.tf                 # Main config
│   │   │   ├── variables.tf            # Variable definitions
│   │   │   ├── outputs.tf              # Output values
│   │   │   │
│   │   │   ├── providers/
│   │   │   │   ├── aws.tf              # AWS provider
│   │   │   │   ├── gcp.tf              # GCP provider
│   │   │   │   └── azure.tf            # Azure provider
│   │   │   │
│   │   │   ├── modules/
│   │   │   │   ├── eks/                # EKS cluster module
│   │   │   │   ├── rds/                # RDS module (MongoDB Atlas alternative)
│   │   │   │   ├── elasticache/        # ElastiCache module
│   │   │   │   ├── mq/                 # Message queue module
│   │   │   │   └── s3/                 # S3 storage module
│   │   │   │
│   │   │   ├── environments/
│   │   │   │   ├── dev.tfvars
│   │   │   │   ├── staging.tfvars
│   │   │   │   └── prod.tfvars
│   │   │   │
│   │   │   └── state/                  # Terraform state (gitignored)
│   │   │       ├── .gitignore
│   │   │       └── backend.tf
│   │   │
│   │   └── helm/                       # Helm charts (optional)
│   │       └── conq/
│   │           ├── Chart.yaml
│   │           ├── values.yaml
│   │           └── templates/
│   │
│   ├── docker-compose.yml              # Local development
│   └── Makefile                        # Development commands
│
└── .github/
    └── workflows/                      # CI/CD pipelines
        ├── build.yml                   # Build images
        ├── test.yml                    # Run tests
        ├── deploy-dev.yml              # Deploy to dev
        ├── deploy-staging.yml          # Deploy to staging
        └── deploy-prod.yml             # Deploy to production
```

---

## 12. KEY METRICS FOR KEDA

### 12.1 CPU & Memory Based

```yaml
# Generic CPU-based scaling
- CPUUtilization: 70%
- MemoryUtilization: 80%
```

### 12.2 Custom Metrics by Service

**Scheduler Service:**
- Queue depth (NATS pending messages)
- Job processing rate

**Publisher Service:**
- Outgoing request queue
- API rate limit headroom
- Response latency percentiles

**Notification Service:**
- Message queue depth
- Processing latency

**Analytics Service:**
- Event ingestion rate
- Processing backlog

**Platform Connectors:**
- API call queue
- External API rate limits
- Response times

### 12.3 Infrastructure Metrics

- Request latency (API Gateway)
- Error rate (all services)
- Database connection pool usage
- NATS stream lag

---

## 13. RECOMMENDATIONS FOR TERRAFORM INTEGRATION

### 13.1 Cloud Platform Choices

**AWS (Recommended for this project):**
- EKS for Kubernetes
- RDS for MongoDB (or DocumentDB)
- ElastiCache for Redis
- NATS operator on EKS
- S3 for object storage

**GCP Alternative:**
- GKE for Kubernetes
- Cloud Firestore or MongoDB Atlas
- Cloud Memorystore for Redis
- GCS for object storage

### 13.2 Terraform Structure

1. **Root Module** (`main.tf`)
   - Provider configuration
   - Module composition

2. **Modules** (`modules/`)
   - EKS/GKE cluster
   - Database (RDS/CloudSQL)
   - Cache (ElastiCache/Memorystore)
   - Message queue (NATS operator)
   - Storage (S3/GCS)
   - Monitoring (CloudWatch/Prometheus)

3. **Environments** (`environments/`)
   - Dev, Staging, Prod configurations
   - Variable overrides per environment
   - Resource sizing differences

4. **State Management** (`state/`)
   - Remote backend configuration
   - State encryption
   - Backup strategy

### 13.3 Key Terraform Variables

```hcl
variable "environment" {
  type = string  # dev, staging, prod
}

variable "cluster_version" {
  type = string  # Kubernetes version
}

variable "node_count" {
  type = number
}

variable "instance_type" {
  type = string  # VM instance type
}

variable "mongodb_version" {
  type = string
}

variable "redis_version" {
  type = string
}

variable "services" {
  type = map(object({
    enabled = bool
    replicas = number
    resources = object({
      cpu = string
      memory = string
    })
  }))
}
```

---

## 14. CONFIGURATION MANAGEMENT STRATEGY

### 14.1 Current Issues

- Environment variables scattered
- No ConfigMaps for non-secret config
- Credentials hardcoded in defaults
- No environment-specific variations

### 14.2 Recommended Approach

**Development (docker-compose):**
- Keep current `.env` file
- Local override capability

**Kubernetes (ConfigMap & Secrets):**
```yaml
# ConfigMap for non-sensitive config
ConfigMap:
  - service-names
  - port mappings
  - log levels
  - feature flags

# Secrets for sensitive data
Secrets:
  - JWT_SECRET
  - Database credentials
  - API keys
  - Credentials for external services
```

**Terraform for Infrastructure:**
```hcl
# Variables for deployment
variable "jwt_secret" {
  sensitive = true
}

variable "database_password" {
  sensitive = true
}

# Outputs for sharing between stacks
output "mongodb_connection_string" {
  sensitive = true
}
```

---

## 15. DEPLOYMENT READINESS CHECKLIST

### 15.1 Docker Readiness
- [ ] Create Dockerfiles for each service
- [ ] Multi-stage builds for optimization
- [ ] Non-root user execution
- [ ] Health check commands
- [ ] Build optimizations (layer caching)

### 15.2 Kubernetes Readiness
- [ ] Create Deployment manifests
- [ ] Define Service objects
- [ ] Implement liveness probes
- [ ] Implement readiness probes
- [ ] Set resource requests/limits
- [ ] Create ConfigMaps for config
- [ ] Create Secrets for credentials
- [ ] Set up ingress for API Gateway

### 15.3 KEDA Readiness
- [ ] Add Prometheus metrics to services
- [ ] Define ScaledObjects for each service
- [ ] Configure scaling triggers
- [ ] Test scaling behavior
- [ ] Set min/max replicas

### 15.4 Terraform Readiness
- [ ] Define infrastructure modules
- [ ] Set up remote state backend
- [ ] Create environment-specific variables
- [ ] Document all outputs
- [ ] Add cost estimation
- [ ] Security hardening (network policies, TLS)

### 15.5 CI/CD Readiness
- [ ] GitHub Actions workflows
- [ ] Build and push Docker images
- [ ] Run tests on every commit
- [ ] Deploy to staging on merge
- [ ] Manual approval for production
- [ ] Automated rollback capability

---

## 16. NEXT STEPS FOR IMPLEMENTATION

### Phase 1: Docker Containerization (Week 1)
1. Create Dockerfile for base image
2. Create service-specific Dockerfiles
3. Set up Docker Compose multi-service testing
4. Create image build pipeline

### Phase 2: Kubernetes Manifests (Week 2)
1. Create namespace and RBAC
2. Create Deployments for all services
3. Create Services for networking
4. Create ConfigMaps and Secrets
5. Create Ingress for API Gateway
6. Add health probes

### Phase 3: KEDA Configuration (Week 3)
1. Add Prometheus metrics to services
2. Deploy Prometheus monitoring
3. Create KEDA ScaledObjects
4. Configure scaling policies
5. Test and tune scaling

### Phase 4: Terraform Infrastructure (Week 4)
1. Set up AWS provider
2. Create EKS cluster module
3. Create RDS/DocumentDB module
4. Create ElastiCache module
5. Create monitoring and logging
6. Create Terraform CI/CD

---

## 17. FILE LOCATIONS REFERENCE

### Source Code
- **Backend Root:** `/home/zenith/Desktop/Code/ConQ/backend/`
- **Services:** `/home/zenith/Desktop/Code/ConQ/backend/services/`
- **API Gateway:** `/home/zenith/Desktop/Code/ConQ/backend/api-gateway/`
- **Shared Code:** `/home/zenith/Desktop/Code/ConQ/backend/shared/`
- **Proto Files:** `/home/zenith/Desktop/Code/ConQ/backend/shared/proto/`

### Scripts
- **Service Startup:** `/home/zenith/Desktop/Code/ConQ/backend/scripts/start-all-services.sh`
- **Service Shutdown:** `/home/zenith/Desktop/Code/ConQ/backend/scripts/stop-all-services.sh`

### Configuration
- **Docker Compose:** `/home/zenith/Desktop/Code/ConQ/docker-compose.yml`
- **Go Workspace:** `/home/zenith/Desktop/Code/ConQ/backend/go.work`
- **Project Docs:** `/home/zenith/Desktop/Code/ConQ/Project_Docs/`

### Service Port Assignments
```
API Gateway: 8080
Auth: 50051
User: 50052
Content: 50053
Scheduler: 50054
Publisher: 50055
Media: 50056
Approval: 50057
Analytics: 50058
Notification: 50059
YouTube: 50061
Instagram: 50062
TikTok: 50063
Facebook: 50064
LinkedIn: 50065
Twitter: 50066
```

---

## 18. INFRASTRUCTURE AS CODE RECOMMENDATIONS

### 18.1 Terraform Module Organization

```
backend/infra/terraform/
├── main.tf                    # Root module
├── variables.tf               # Input variables
├── outputs.tf                 # Module outputs
├── terraform.tfvars          # Default values
├── backend.tf                # State configuration
│
├── modules/
│   ├── kubernetes/           # K8s cluster setup
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── versions.tf
│   │
│   ├── database/            # MongoDB/RDS
│   │   └── ...
│   │
│   ├── cache/               # Redis/ElastiCache
│   │   └── ...
│   │
│   ├── messaging/           # NATS/MQ
│   │   └── ...
│   │
│   ├── storage/             # S3/GCS
│   │   └── ...
│   │
│   └── monitoring/          # Prometheus/CloudWatch
│       └── ...
│
├── environments/
│   ├── dev/
│   │   ├── terraform.tfvars
│   │   └── main.tf
│   │
│   ├── staging/
│   │   └── ...
│   │
│   └── prod/
│       └── ...
│
└── scripts/
    ├── init.sh              # Initialize environment
    ├── plan.sh              # Plan changes
    ├── apply.sh             # Apply changes
    └── destroy.sh           # Destroy resources
```

### 18.2 Key Terraform Files Needed

**backend/infra/terraform/main.tf**
```hcl
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }

  # Remote backend (create S3 bucket first)
  backend "s3" {
    bucket         = "conq-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

module "eks" {
  source = "./modules/kubernetes"
  # ...
}

module "database" {
  source = "./modules/database"
  # ...
}
```

---

## CONCLUSION

The ConQ backend has a **solid microservices foundation** with:

1. ✅ Consistent service architecture
2. ✅ Proper separation of concerns
3. ✅ Shared utilities and configuration
4. ✅ Event-driven communication
5. ✅ Clean API design (GraphQL + gRPC)

**Ready for Kubernetes deployment** with:
- Clear service boundaries
- Standard startup patterns
- Graceful shutdown handling
- Centralized configuration

**Key gaps to address:**
1. Create Dockerfiles
2. Add Kubernetes manifests
3. Implement KEDA scaling configuration
4. Set up Terraform infrastructure code
5. Add comprehensive monitoring

The recommended approach is to create the `/backend/infra/` directory structure with Docker, Kubernetes, and Terraform configurations, following the patterns already established in the codebase.

