#!/bin/bash

# Stop all Conq backend services

echo "Stopping Conq Backend Services..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Check if logs directory exists
if [ ! -d "logs" ]; then
  echo -e "${RED}No logs directory found. Services may not be running.${NC}"
  exit 1
fi

# Function to stop a service
stop_service() {
  local pid_file=$1
  local service_name=$(basename "$pid_file" .pid)

  if [ -f "$pid_file" ]; then
    pid=$(cat "$pid_file")

    if ps -p $pid > /dev/null; then
      echo -e "${RED}✖ Stopping $service_name (PID: $pid)${NC}"
      kill $pid
      rm "$pid_file"
    else
      echo -e "${RED}⚠ $service_name not running (PID file exists but process not found)${NC}"
      rm "$pid_file"
    fi
  fi
}

# Stop all services
for pid_file in logs/*.pid; do
  if [ -f "$pid_file" ]; then
    stop_service "$pid_file"
  fi
done

echo ""
echo -e "${GREEN}✓ All services stopped!${NC}"

# Optional: Clean up log files
read -p "Do you want to delete log files? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  rm -f logs/*.log
  echo -e "${GREEN}✓ Log files deleted${NC}"
fi
