#!/bin/bash

# Start all Conq backend services

echo "Starting Conq Backend Services..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Array of services with their ports
declare -A services=(
  ["api-gateway"]="8080"
  ["auth-service"]="50051"
  ["user-service"]="50052"
  ["content-service"]="50053"
  ["scheduler-service"]="50054"
  ["publisher-service"]="50055"
  ["media-service"]="50056"
  ["approval-service"]="50057"
  ["analytics-service"]="50058"
  ["notification-service"]="50059"
)

# Platform connectors
declare -A connectors=(
  ["youtube"]="50061"
  ["instagram"]="50062"
  ["tiktok"]="50063"
  ["facebook"]="50064"
  ["linkedin"]="50065"
  ["twitter"]="50066"
)

# Function to start a service
start_service() {
  local service=$1
  local port=$2
  local path=$3

  if [ ! -f "$path/main.go" ]; then
    echo -e "${YELLOW}⚠ Skipping $service (main.go not found)${NC}"
    return
  fi

  cd "$path"

  # Check if port is already in use
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠ Port $port already in use, skipping $service${NC}"
    cd - > /dev/null
    return
  fi

  echo -e "${GREEN}▶ Starting $service on port $port${NC}"

  # Start service in background
  nohup go run main.go > "../../logs/${service}.log" 2>&1 &
  echo $! > "../../logs/${service}.pid"

  cd - > /dev/null
}

# Create logs directory
mkdir -p logs

# Start API Gateway
echo ""
echo "=== Starting API Gateway ==="
start_service "api-gateway" "${services[api-gateway]}" "api-gateway"

# Start core services
echo ""
echo "=== Starting Core Services ==="
for service in "${!services[@]}"; do
  if [ "$service" != "api-gateway" ]; then
    start_service "$service" "${services[$service]}" "services/$service"
  fi
done

# Start platform connectors
echo ""
echo "=== Starting Platform Connectors ==="
for connector in "${!connectors[@]}"; do
  start_service "$connector-connector" "${connectors[$connector]}" "services/platform-connectors/$connector"
done

echo ""
echo -e "${GREEN}✓ All services started!${NC}"
echo ""
echo "Service URLs:"
echo "  API Gateway:  http://localhost:8080"
echo "  GraphQL:      http://localhost:8080/graphql"
echo "  Health Check: http://localhost:8080/health"
echo ""
echo "Logs directory: ./logs/"
echo "To stop all services: ./scripts/stop-all-services.sh"
