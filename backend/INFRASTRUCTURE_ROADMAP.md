# ConQ Backend - Infrastructure Roadmap

## Current State vs. Deployment Ready

### Today's State (Local Development)
```
┌─────────────────────────────────────────────────────────────┐
│                    Development Environment                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Services (17 services):                                     │
│  ├─ Running with: go run main.go                            │
│  ├─ Ports: hardcoded in code                                │
│  └─ Logs: stdout/stderr                                     │
│                                                               │
│  Infrastructure (docker-compose):                           │
│  ├─ MongoDB (port 27017)                                    │
│  ├─ Redis (port 6379)                                       │
│  ├─ NATS (port 4222)                                        │
│  └─ MinIO (port 9000)                                       │
│                                                               │
│  Configuration:                                              │
│  ├─ Environment variables (.env)                            │
│  ├─ Shared code in backend/shared/                          │
│  └─ No secrets management                                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Deployment Ready (Post-Implementation)
```
┌─────────────────────────────────────────────────────────────┐
│          Production Kubernetes Cluster (AWS EKS)             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │        Kubernetes Cluster (Terraform Managed)         │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │                                                         │  │
│  │  API Gateway (8080)                                   │  │
│  │  ├─ Deployment: 2-10 replicas (KEDA scaled)          │  │
│  │  └─ Service: LoadBalancer                            │  │
│  │                                                         │  │
│  │  Auth Service (50051)                                 │  │
│  │  ├─ Deployment: 2-5 replicas                         │  │
│  │  └─ Service: ClusterIP                               │  │
│  │                                                         │  │
│  │  Scheduler Service (50054) ← KEDA SCALED             │  │
│  │  ├─ Deployment: 1-20 replicas                        │  │
│  │  ├─ ScaledObject: NATS queue depth                   │  │
│  │  └─ Service: ClusterIP                               │  │
│  │                                                         │  │
│  │  Publisher Service (50055) ← KEDA SCALED             │  │
│  │  ├─ Deployment: 1-20 replicas                        │  │
│  │  ├─ ScaledObject: API queue + latency                │  │
│  │  └─ Service: ClusterIP                               │  │
│  │                                                         │  │
│  │  Platform Connectors (50061-50066) ← KEDA SCALED     │  │
│  │  ├─ Deployment: 1-10 per connector                   │  │
│  │  ├─ ScaledObject: External API queue                 │  │
│  │  └─ Service: ClusterIP                               │  │
│  │                                                         │  │
│  │  [11 More Services... same pattern]                   │  │
│  │                                                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         AWS RDS (MongoDB)                             │  │
│  │         AWS ElastiCache (Redis)                       │  │
│  │         AWS S3 (MinIO alternative)                    │  │
│  │         NATS Operator (K8s deployed)                  │  │
│  │         Prometheus + Grafana (monitoring)             │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Docker Containerization (Week 1)

#### Goal: Make all 17 services containerizable

**Deliverables:**
- [x] Analyze current codebase
- [ ] Create `backend/infra/docker/Dockerfile.base`
- [ ] Create `backend/infra/docker/Dockerfile.service`
- [ ] Build and test all 17 images
- [ ] Push to container registry (ECR/GCR/Docker Hub)

**Files to Create:**
```
backend/infra/docker/
├── Dockerfile.base          # Multi-stage base image
├── Dockerfile.service       # Service-specific builds
├── .dockerignore            # Optimize layer caching
├── build.sh                 # Build script for all services
└── registry-config.sh       # Push to container registry
```

**Acceptance Criteria:**
- All 17 services have working Docker images
- Images are < 100MB each
- Images build in < 5 minutes
- Can run `docker run conq/auth-service` locally

---

### Phase 2: Kubernetes Manifests (Week 2)

#### Goal: Deploy all services to Kubernetes

**Deliverables:**
- [ ] Create namespace and RBAC
- [ ] Create ConfigMaps for non-sensitive config
- [ ] Create Secrets for credentials
- [ ] Create Deployments for all 17 services
- [ ] Create Services for internal networking
- [ ] Create Ingress for API Gateway
- [ ] Add liveness probes
- [ ] Add readiness probes

**Files to Create:**
```
backend/infra/kubernetes/
├── base/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   └── rbac.yaml
│
├── services/
│   ├── auth/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── hpa.yaml
│   ├── scheduler/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── hpa.yaml
│   │   └── keda-scaler.yaml
│   ├── publisher/
│   │   └── [similar structure]
│   └── [11 more services...]
│
├── gateway/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
│
├── infrastructure/
│   ├── mongodb.yaml         # StatefulSet
│   ├── redis.yaml           # StatefulSet
│   ├── nats.yaml            # NATS operator
│   └── prometheus.yaml      # Monitoring
│
└── kustomization.yaml       # Overlay management
```

**Acceptance Criteria:**
- Deploy to local K8s cluster (minikube/Docker Desktop)
- All pods are running and healthy
- Services communicate via DNS
- API Gateway is accessible via Ingress

---

### Phase 3: KEDA Scaling (Week 3)

#### Goal: Implement auto-scaling based on metrics

**Deliverables:**
- [ ] Add Prometheus metrics to all services
- [ ] Deploy Prometheus Operator
- [ ] Create KEDA ScaledObjects for 5+ services
- [ ] Configure scaling thresholds
- [ ] Load test and tune metrics

**Files to Create:**
```
backend/infra/kubernetes/
├── monitoring/
│   ├── prometheus-values.yaml
│   ├── prometheus-rules.yaml
│   └── grafana-dashboard.yaml
│
├── keda/
│   ├── keda-values.yaml     # KEDA Helm values
│   └── scaledobjects/       # One per service
│       ├── scheduler-scaler.yaml
│       ├── publisher-scaler.yaml
│       ├── platform-connectors-scaler.yaml
│       ├── notification-scaler.yaml
│       └── analytics-scaler.yaml
│
└── prometheus-rules/
    ├── conq-services.yaml
    └── custom-metrics.yaml
```

**Metrics to Implement:**
```
Auth Service:
  - http_requests_total
  - http_request_duration_seconds

Scheduler Service:
  - nats_pending_messages         ← KEDA trigger
  - job_processing_duration
  - queue_depth

Publisher Service:
  - api_queue_depth               ← KEDA trigger
  - api_response_time_seconds
  - publishing_errors_total

Platform Connectors:
  - external_api_calls_total      ← KEDA trigger
  - external_api_response_time
  - rate_limit_remaining

Notification Service:
  - message_queue_depth           ← KEDA trigger
  - notification_processing_time
  - notification_failures_total

Analytics Service:
  - event_ingestion_rate          ← KEDA trigger
  - processing_lag_seconds
  - events_processed_total
```

**Acceptance Criteria:**
- Prometheus scrapes all services
- KEDA responds to metric changes
- Pods scale up under load
- Pods scale down when idle
- Scaling is stable (no rapid flapping)

---

### Phase 4: Terraform Infrastructure (Week 4)

#### Goal: Infrastructure-as-code for repeatable deployments

**Deliverables:**
- [ ] Set up AWS provider
- [ ] Create EKS cluster module
- [ ] Create RDS (MongoDB) module
- [ ] Create ElastiCache (Redis) module
- [ ] Create S3 module
- [ ] Create monitoring/logging module
- [ ] Set up Terraform state backend
- [ ] Create environment-specific configurations

**Files to Create:**
```
backend/infra/terraform/
├── main.tf                  # Root module composition
├── variables.tf             # Input variables
├── outputs.tf               # Output values
├── versions.tf              # Terraform & provider versions
├── backend.tf               # State management
│
├── modules/
│   ├── eks/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── versions.tf
│   │
│   ├── rds/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── security-group.tf
│   │
│   ├── elasticache/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── security-group.tf
│   │
│   ├── s3/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   │
│   ├── iam/
│   │   ├── main.tf
│   │   ├── eks-role.tf
│   │   ├── rds-role.tf
│   │   └── s3-role.tf
│   │
│   ├── monitoring/
│   │   ├── main.tf
│   │   ├── cloudwatch.tf
│   │   └── alarms.tf
│   │
│   └── networking/
│       ├── main.tf
│       ├── vpc.tf
│       ├── subnets.tf
│       └── security-groups.tf
│
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   └── dev.tfvars
│   │
│   ├── staging/
│   │   ├── main.tf
│   │   └── staging.tfvars
│   │
│   └── prod/
│       ├── main.tf
│       └── prod.tfvars
│
└── scripts/
    ├── init.sh              # Initialize workspace
    ├── plan.sh              # Terraform plan
    ├── apply.sh             # Terraform apply
    ├── destroy.sh           # Terraform destroy
    └── validate.sh          # Validate configuration
```

**AWS Infrastructure:**
```
Region: us-east-1 (or configurable)

EKS Cluster:
  - Kubernetes 1.28+
  - 3 availability zones
  - Auto Scaling Groups (2-10 nodes)
  - Node IAM roles configured
  - VPC CNI plugin configured
  - Calico network policy support

RDS (MongoDB-compatible):
  - DocumentDB cluster
  - Multi-AZ deployment
  - Automated backups (30 days)
  - Encryption at rest
  - Encryption in transit

ElastiCache (Redis):
  - Redis 7.0
  - Multi-AZ deployment
  - Automatic failover
  - Encryption at rest
  - Encryption in transit

S3:
  - Bucket for application data
  - Versioning enabled
  - Server-side encryption
  - Public access blocked
  - CloudFront CDN (optional)

CloudWatch:
  - Log groups for EKS
  - CloudWatch alarms
  - Dashboard for metrics
```

**Acceptance Criteria:**
- `terraform plan` shows all infrastructure
- `terraform apply` creates everything
- EKS cluster is reachable
- Databases are accessible
- Terraform state is remote and locked
- Can deploy to dev/staging/prod with one command

---

## Go.work Update (Immediate)

**Current:**
```go
use (
    ./api-gateway
    ./services/auth-service
    ./shared
)
```

**Should Be:**
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

## Success Metrics

### Phase 1 Success
- All 17 services have Docker images
- Images are < 100MB
- Builds complete in < 5 minutes

### Phase 2 Success
- All pods are running in K8s
- Pods are healthy (liveness + readiness checks passing)
- Services communicate via DNS
- API Gateway is reachable via Ingress

### Phase 3 Success
- Prometheus scrapes all metrics
- KEDA scales Scheduler Service 1-20 replicas
- KEDA scales Publisher Service 1-20 replicas
- No flapping (rapid scale up/down)
- <2 minute scaling decision latency

### Phase 4 Success
- EKS cluster created with Terraform
- RDS instance created with Terraform
- ElastiCache created with Terraform
- All 17 services deployed to EKS
- Applications connect to cloud infrastructure
- State is managed in S3 with locking

---

## Estimated Timeline

| Phase | Duration | Team Size | Effort |
|-------|----------|-----------|--------|
| Docker | 1 week | 1-2 people | 40-80 hours |
| Kubernetes | 1 week | 1-2 people | 40-80 hours |
| KEDA | 1 week | 1 person | 30-40 hours |
| Terraform | 2 weeks | 1-2 people | 80-120 hours |
| **TOTAL** | **5 weeks** | **2 people** | **190-320 hours** |

---

## Risk Mitigation

### Docker Phase Risks
- **Service dependencies:** Mitigate by testing locally first
- **Image size:** Mitigate by using multi-stage builds
- **Registry access:** Mitigate by setting up credentials early

### Kubernetes Phase Risks
- **Network configuration:** Mitigate by testing on local cluster
- **Resource requirements:** Mitigate by load testing
- **ConfigMap/Secret management:** Mitigate by using sealed-secrets

### KEDA Phase Risks
- **Metric collection:** Mitigate by adding metrics incrementally
- **Scaling thresholds:** Mitigate by load testing each service
- **KEDA reliability:** Mitigate by monitoring KEDA itself

### Terraform Phase Risks
- **AWS account setup:** Mitigate by planning beforehand
- **Cost:** Mitigate by using dev/staging tiers
- **State corruption:** Mitigate by enabling remote locking
- **IAM permissions:** Mitigate by using least privilege principle

---

## Dependencies & Prerequisites

### Before Phase 1 (Docker)
- [ ] Docker installed locally
- [ ] All services tested with `go run main.go`
- [ ] `backend/infra/` directory created

### Before Phase 2 (Kubernetes)
- [ ] All Docker images built
- [ ] Images stored in registry
- [ ] Local K8s cluster (minikube/Docker Desktop)
- [ ] kubectl configured

### Before Phase 3 (KEDA)
- [ ] All services deployed to K8s
- [ ] Services communicating
- [ ] Prometheus installed
- [ ] KEDA installed

### Before Phase 4 (Terraform)
- [ ] AWS account created
- [ ] AWS credentials configured
- [ ] Terraform installed locally
- [ ] S3 bucket for state

---

## Success Story (Post-Implementation)

```
Before:
  - Deploy: `./scripts/start-all-services.sh` (local only)
  - Scaling: Manual (edit deployment replicas)
  - Monitoring: Basic health checks
  - Cost: Predictable single server

After:
  - Deploy: `terraform apply -var-file=prod.tfvars`
  - Scaling: Automatic (KEDA responds to metrics)
  - Monitoring: Prometheus + Grafana + alerts
  - Cost: Pay for what you use (auto-scales)
```

---

## Next Steps Right Now

1. **Read Documentation**
   - `ARCHITECTURE_ANALYSIS.md` (full analysis)
   - `KEY_FINDINGS.md` (quick summary)

2. **Prepare Environment**
   - Update `go.work` to include all services
   - Create `backend/infra/` directory structure
   - Set up container registry account

3. **Week 1: Start Docker Phase**
   - Create base Dockerfile
   - Build first 3 services
   - Test locally

---

**Last Updated:** October 23, 2025
**Status:** Ready for Implementation
**Recommended Start Date:** Next Monday

