# Development Environment Configuration
environment  = "dev"
region       = "us-east-1"
cluster_name = "conq-dev-cluster"

# Networking
vpc_cidr = "10.0.0.0/16"
private_subnet_cidrs = [
  "10.0.1.0/24",
  "10.0.2.0/24",
  "10.0.3.0/24"
]
public_subnet_cidrs = [
  "10.0.101.0/24",
  "10.0.102.0/24",
  "10.0.103.0/24"
]

# Kubernetes Cluster
cluster_version = "1.28"
node_groups = {
  general = {
    instance_types = ["t3.medium"]
    min_size       = 2
    max_size       = 5
    desired_size   = 3
    disk_size      = 20
  }
}

# MongoDB
mongodb_instance_type = "t3.medium"
mongodb_storage_size  = 20
mongodb_backup_retention = 1

# Redis
redis_node_type       = "cache.t3.micro"
redis_num_cache_nodes = 1

# KEDA Configuration
keda_enabled = true
keda_metrics_api_enabled = true

# Service Replicas (base values, KEDA will autoscale)
service_replicas = {
  api_gateway     = 2
  auth_service    = 1
  user_service    = 1
  content_service = 1
  scheduler_service = 1
  publisher_service = 1
  team_service    = 1
  media_service   = 1
  analytics_service = 1
  notification_service = 1
  workflow_service = 1
  # Platform connectors
  twitter_connector  = 1
  facebook_connector = 1
  instagram_connector = 1
  linkedin_connector = 1
  youtube_connector = 1
  tiktok_connector = 1
}

# Resource Limits
resource_limits = {
  default_cpu_request    = "100m"
  default_memory_request = "128Mi"
  default_cpu_limit      = "500m"
  default_memory_limit   = "512Mi"
}

# Tags
tags = {
  Environment = "development"
  Project     = "conq"
  ManagedBy   = "terraform"
  Team        = "platform"
}