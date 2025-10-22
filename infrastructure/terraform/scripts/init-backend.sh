#!/bin/bash

# Script to initialize Terraform backend resources
# This creates the S3 bucket and DynamoDB table needed for remote state

set -e

# Configuration
BUCKET_NAME="conq-terraform-state"
DYNAMODB_TABLE="conq-terraform-locks"
REGION="${AWS_REGION:-us-east-1}"

echo "🚀 Initializing Terraform Backend Resources"
echo "==========================================

"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure'."
    exit 1
fi

echo "📦 Creating S3 bucket for state storage..."

# Create S3 bucket
if aws s3 ls "s3://${BUCKET_NAME}" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3api create-bucket \
        --bucket "${BUCKET_NAME}" \
        --region "${REGION}" \
        $(if [ "${REGION}" != "us-east-1" ]; then echo "--create-bucket-configuration LocationConstraint=${REGION}"; fi)

    echo "✅ S3 bucket created: ${BUCKET_NAME}"
else
    echo "ℹ️  S3 bucket already exists: ${BUCKET_NAME}"
fi

# Enable versioning on S3 bucket
aws s3api put-bucket-versioning \
    --bucket "${BUCKET_NAME}" \
    --versioning-configuration Status=Enabled

echo "✅ Versioning enabled on S3 bucket"

# Enable encryption on S3 bucket
aws s3api put-bucket-encryption \
    --bucket "${BUCKET_NAME}" \
    --server-side-encryption-configuration '{
        "Rules": [
            {
                "ApplyServerSideEncryptionByDefault": {
                    "SSEAlgorithm": "AES256"
                }
            }
        ]
    }'

echo "✅ Encryption enabled on S3 bucket"

# Block public access to S3 bucket
aws s3api put-public-access-block \
    --bucket "${BUCKET_NAME}" \
    --public-access-block-configuration \
        "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

echo "✅ Public access blocked on S3 bucket"

echo ""
echo "🔒 Creating DynamoDB table for state locking..."

# Create DynamoDB table for state locking
if ! aws dynamodb describe-table --table-name "${DYNAMODB_TABLE}" --region "${REGION}" &> /dev/null; then
    aws dynamodb create-table \
        --table-name "${DYNAMODB_TABLE}" \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST \
        --region "${REGION}" \
        --tags "Key=Project,Value=conq" "Key=Purpose,Value=terraform-state-lock"

    echo "✅ DynamoDB table created: ${DYNAMODB_TABLE}"

    # Wait for table to be active
    echo "⏳ Waiting for DynamoDB table to be active..."
    aws dynamodb wait table-exists --table-name "${DYNAMODB_TABLE}" --region "${REGION}"
    echo "✅ DynamoDB table is active"
else
    echo "ℹ️  DynamoDB table already exists: ${DYNAMODB_TABLE}"
fi

echo ""
echo "🎉 Terraform backend initialization complete!"
echo ""
echo "Next steps:"
echo "1. Navigate to your Terraform configuration directory"
echo "2. Run: terraform init"
echo "3. Run: terraform plan"
echo "4. Run: terraform apply"
echo ""
echo "Backend configuration:"
echo "  S3 Bucket: ${BUCKET_NAME}"
echo "  DynamoDB Table: ${DYNAMODB_TABLE}"
echo "  Region: ${REGION}"