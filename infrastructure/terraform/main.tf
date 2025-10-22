# ConQ Platform - Main Terraform Configuration
# This is the root module that orchestrates all infrastructure components

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Variables
variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "cluster_name" {
  description = "Kubernetes cluster name"
  type        = string
}

# Networking Module
module "networking" {
  source = "./modules/networking"

  environment  = var.environment
  cluster_name = var.cluster_name
  region       = var.region
}

# Kubernetes Cluster Module
module "kubernetes" {
  source = "./modules/kubernetes"

  environment  = var.environment
  cluster_name = var.cluster_name
  vpc_id       = module.networking.vpc_id
  subnet_ids   = module.networking.private_subnet_ids
}

# KEDA Module - Event Driven Autoscaling
module "keda" {
  source = "./modules/keda"

  cluster_name = var.cluster_name
  namespace    = "keda-system"

  depends_on = [module.kubernetes]
}

# MongoDB Module
module "mongodb" {
  source = "./modules/databases/mongodb"

  environment = var.environment
  vpc_id      = module.networking.vpc_id
  subnet_ids  = module.networking.private_subnet_ids
}

# Redis Module
module "redis" {
  source = "./modules/databases/redis"

  environment = var.environment
  vpc_id      = module.networking.vpc_id
  subnet_ids  = module.networking.private_subnet_ids
}

# NATS Module
module "nats" {
  source = "./modules/messaging/nats"

  environment  = var.environment
  cluster_name = var.cluster_name
  namespace    = "nats-system"

  depends_on = [module.kubernetes]
}

# MinIO Module (S3-compatible storage)
module "minio" {
  source = "./modules/storage/minio"

  environment  = var.environment
  cluster_name = var.cluster_name
  namespace    = "minio-system"

  depends_on = [module.kubernetes]
}

# Monitoring Stack (Prometheus, Grafana)
module "monitoring" {
  source = "./modules/monitoring"

  environment  = var.environment
  cluster_name = var.cluster_name
  namespace    = "monitoring"

  depends_on = [module.kubernetes]
}

# ConQ Services Module
module "conq_services" {
  source = "./modules/conq-services"

  environment     = var.environment
  cluster_name    = var.cluster_name
  namespace       = "conq"
  mongodb_uri     = module.mongodb.connection_string
  redis_uri       = module.redis.connection_string
  nats_url        = module.nats.connection_url
  minio_endpoint  = module.minio.endpoint

  depends_on = [
    module.kubernetes,
    module.keda,
    module.mongodb,
    module.redis,
    module.nats,
    module.minio
  ]
}

# Outputs
output "cluster_endpoint" {
  value = module.kubernetes.cluster_endpoint
}

output "mongodb_uri" {
  value     = module.mongodb.connection_string
  sensitive = true
}

output "redis_uri" {
  value     = module.redis.connection_string
  sensitive = true
}