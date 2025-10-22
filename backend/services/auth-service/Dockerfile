# Dockerfile for ConQ Auth Service
# Handles authentication and authorization

# Build stage
FROM golang:1.21-alpine AS builder

RUN apk add --no-cache git make gcc musl-dev

WORKDIR /build

# Copy go.mod and go.sum
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the auth service
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o auth-service .

# Runtime stage
FROM alpine:3.18

RUN apk --no-cache add ca-certificates tzdata

# Create non-root user
RUN addgroup -g 1000 conq && \
    adduser -D -u 1000 -G conq conq

WORKDIR /app

# Copy binary from builder
COPY --from=builder /build/auth-service /app/auth-service
RUN chmod +x /app/auth-service

RUN chown -R conq:conq /app

USER conq

# Environment variables
ENV PORT=50051
ENV MONGO_URI=mongodb://admin:password@mongodb:27017/conq
ENV REDIS_URI=redis://redis:6379
ENV NATS_URL=nats://nats:4222
ENV JWT_SECRET=your-secret-key-here
ENV JWT_EXPIRY=15m
ENV REFRESH_TOKEN_EXPIRY=7d

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD nc -z localhost 50051 || exit 1

EXPOSE 50051

ENTRYPOINT ["/app/auth-service"]