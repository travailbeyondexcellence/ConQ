# KEDA (Kubernetes Event Driven Autoscaler) Module
# Installs and configures KEDA for event-driven autoscaling

terraform {
  required_providers {
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
}

# Variables
variable "cluster_name" {
  description = "Kubernetes cluster name"
  type        = string
}

variable "namespace" {
  description = "Namespace to install KEDA"
  type        = string
  default     = "keda-system"
}

variable "keda_version" {
  description = "KEDA Helm chart version"
  type        = string
  default     = "2.12.1"
}

# Create KEDA namespace
resource "kubernetes_namespace" "keda" {
  metadata {
    name = var.namespace
    labels = {
      name        = var.namespace
      managed-by  = "terraform"
      purpose     = "autoscaling"
    }
  }
}

# Install KEDA using Helm
resource "helm_release" "keda" {
  name       = "keda"
  repository = "https://kedacore.github.io/charts"
  chart      = "keda"
  version    = var.keda_version
  namespace  = kubernetes_namespace.keda.metadata[0].name

  set {
    name  = "prometheus.metricServer.enabled"
    value = "true"
  }

  set {
    name  = "prometheus.metricServer.port"
    value = "8080"
  }

  set {
    name  = "prometheus.operator.enabled"
    value = "true"
  }

  set {
    name  = "prometheus.operator.port"
    value = "8686"
  }

  # Enable logging
  set {
    name  = "logging.operator.level"
    value = "info"
  }

  set {
    name  = "logging.metricServer.level"
    value = "info"
  }

  # Resource limits for KEDA operator
  set {
    name  = "resources.operator.limits.cpu"
    value = "1"
  }

  set {
    name  = "resources.operator.limits.memory"
    value = "1Gi"
  }

  set {
    name  = "resources.operator.requests.cpu"
    value = "100m"
  }

  set {
    name  = "resources.operator.requests.memory"
    value = "128Mi"
  }

  # Resource limits for Metrics API server
  set {
    name  = "resources.metricServer.limits.cpu"
    value = "1"
  }

  set {
    name  = "resources.metricServer.limits.memory"
    value = "1Gi"
  }

  set {
    name  = "resources.metricServer.requests.cpu"
    value = "100m"
  }

  set {
    name  = "resources.metricServer.requests.memory"
    value = "128Mi"
  }
}

# Create TriggerAuthentication for NATS
resource "kubernetes_manifest" "nats_trigger_auth" {
  manifest = {
    apiVersion = "keda.sh/v1alpha1"
    kind       = "TriggerAuthentication"
    metadata = {
      name      = "nats-trigger-auth"
      namespace = "conq"
    }
    spec = {
      secretTargetRef = [
        {
          parameter = "username"
          name      = "nats-credentials"
          key       = "username"
        },
        {
          parameter = "password"
          name      = "nats-credentials"
          key       = "password"
        }
      ]
    }
  }

  depends_on = [helm_release.keda]
}

# Create TriggerAuthentication for MongoDB
resource "kubernetes_manifest" "mongodb_trigger_auth" {
  manifest = {
    apiVersion = "keda.sh/v1alpha1"
    kind       = "TriggerAuthentication"
    metadata = {
      name      = "mongodb-trigger-auth"
      namespace = "conq"
    }
    spec = {
      secretTargetRef = [
        {
          parameter = "connectionString"
          name      = "mongodb-credentials"
          key       = "connection-string"
        }
      ]
    }
  }

  depends_on = [helm_release.keda]
}

# Create TriggerAuthentication for Redis
resource "kubernetes_manifest" "redis_trigger_auth" {
  manifest = {
    apiVersion = "keda.sh/v1alpha1"
    kind       = "TriggerAuthentication"
    metadata = {
      name      = "redis-trigger-auth"
      namespace = "conq"
    }
    spec = {
      secretTargetRef = [
        {
          parameter = "password"
          name      = "redis-credentials"
          key       = "password"
        }
      ]
    }
  }

  depends_on = [helm_release.keda]
}

# Outputs
output "keda_namespace" {
  value = kubernetes_namespace.keda.metadata[0].name
}

output "keda_version" {
  value = helm_release.keda.version
}

output "keda_status" {
  value = helm_release.keda.status
}