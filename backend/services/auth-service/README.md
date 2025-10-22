# Auth Service

Authentication and authorization service for Conq.

## Port: 50051

## Responsibilities

- User registration and login
- JWT token generation and validation
- Password hashing (bcrypt)
- Session management

## gRPC Methods

```protobuf
service AuthService {
  rpc Register(RegisterRequest) returns (AuthResponse);
  rpc Login(LoginRequest) returns (AuthResponse);
  rpc ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse);
  rpc RefreshToken(RefreshTokenRequest) returns (AuthResponse);
}
```

## Environment Variables

```bash
GRPC_PORT=50051
MONGO_URI=mongodb://admin:password@localhost:27017
DB_NAME=conq
NATS_URL=nats://localhost:4222
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=24h
```

## Database Collections

- `users`: User credentials and profile

## NATS Events

**Published:**
- `auth.user.registered` - When new user registers
- `auth.user.login` - When user logs in
- `auth.user.logout` - When user logs out

## Running

```bash
go run main.go
```
