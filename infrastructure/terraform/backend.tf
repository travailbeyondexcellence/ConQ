# Terraform Backend Configuration
# Stores Terraform state remotely for team collaboration

terraform {
  backend "s3" {
    # S3 bucket for state storage
    bucket = "conq-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-east-1"

    # DynamoDB table for state locking
    dynamodb_table = "conq-terraform-locks"

    # Encrypt state at rest
    encrypt = true

    # Enable versioning for state history
    versioning = true

    # Add tags to the state file
    tags = {
      Project     = "conq"
      ManagedBy   = "terraform"
      Purpose     = "state-storage"
    }
  }
}

# Alternative: Local backend for development
# Uncomment this and comment out S3 backend for local testing
#
# terraform {
#   backend "local" {
#     path = "../../.terraform/terraform.tfstate"
#   }
# }

# Alternative: Terraform Cloud backend
# For enterprise teams using Terraform Cloud
#
# terraform {
#   cloud {
#     organization = "conq-org"
#
#     workspaces {
#       name = "conq-infrastructure"
#     }
#   }
# }