# Dockerfile for ConQ API Gateway
# GraphQL API Gateway service

# Build stage
FROM golang:1.21-alpine AS builder

RUN apk add --no-cache git make gcc musl-dev

WORKDIR /build

# Copy go.mod and go.sum
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the API Gateway
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o api-gateway .

# Runtime stage
FROM alpine:3.18

RUN apk --no-cache add ca-certificates tzdata

# Create non-root user
RUN addgroup -g 1000 conq && \
    adduser -D -u 1000 -G conq conq

WORKDIR /app

# Copy binary from builder
COPY --from=builder /build/api-gateway /app/api-gateway
RUN chmod +x /app/api-gateway

# Copy GraphQL schema files if they exist
COPY --from=builder /build/graph/schema/* /app/graph/schema/

RUN chown -R conq:conq /app

USER conq

# Environment variables
ENV PORT=8080
ENV AUTH_SERVICE_ADDR=auth-service:50051
ENV USER_SERVICE_ADDR=user-service:50052
ENV CONTENT_SERVICE_ADDR=content-service:50053
ENV SCHEDULER_SERVICE_ADDR=scheduler-service:50054
ENV PUBLISHER_SERVICE_ADDR=publisher-service:50055
ENV TEAM_SERVICE_ADDR=team-service:50056
ENV MEDIA_SERVICE_ADDR=media-service:50057
ENV ANALYTICS_SERVICE_ADDR=analytics-service:50058
ENV NOTIFICATION_SERVICE_ADDR=notification-service:50059
ENV WORKFLOW_SERVICE_ADDR=workflow-service:50060

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

EXPOSE 8080

ENTRYPOINT ["/app/api-gateway"]