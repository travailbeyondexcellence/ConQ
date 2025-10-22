# ConQ Infrastructure

This directory contains all Infrastructure as Code (IaC) configurations for the ConQ platform.

## Directory Structure

```
infrastructure/
├── terraform/           # Terraform configurations
│   ├── environments/   # Environment-specific configs
│   ├── modules/        # Reusable Terraform modules
│   └── global/         # Global resources
├── kubernetes/         # Kubernetes manifests
│   ├── base/          # Base configurations
│   ├── overlays/      # Environment overlays
│   └── keda/          # KEDA autoscaling configs
└── docker/            # Docker configurations
    └── services/      # Service Dockerfiles
```

## Technology Stack

- **Terraform**: Infrastructure provisioning and management
- **Kubernetes**: Container orchestration
- **KEDA**: Event-driven autoscaling
- **Docker**: Container runtime
- **Helm**: Kubernetes package management (optional)

## Getting Started

1. **Docker**: Build container images
   ```bash
   cd docker/services
   ./build-all.sh
   ```

2. **Terraform**: Provision infrastructure
   ```bash
   cd terraform/environments/dev
   terraform init
   terraform plan
   terraform apply
   ```

3. **Kubernetes**: Deploy services
   ```bash
   cd kubernetes
   kubectl apply -k overlays/dev
   ```

4. **KEDA**: Enable autoscaling
   ```bash
   kubectl apply -f kubernetes/keda/
   ```

## Environments

- **dev**: Development environment (local/minikube)
- **staging**: Pre-production testing
- **production**: Live production environment

## Prerequisites

- Docker 20.10+
- Kubernetes 1.25+
- Terraform 1.5+
- KEDA 2.12+
- kubectl 1.25+