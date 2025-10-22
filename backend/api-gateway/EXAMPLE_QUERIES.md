# GraphQL Example Queries and Mutations

This file contains example GraphQL operations for testing the implemented auth resolvers.

## Health Check

### Simple Health Check
```graphql
query HealthCheck {
  health
}
```

**Expected Response:**
```json
{
  "data": {
    "health": "OK"
  }
}
```

---

## User Registration

### Register New User
```graphql
mutation RegisterUser {
  register(input: {
    name: "John Doe"
    email: "john.doe@example.com"
    password: "SecurePassword123!"
  }) {
    token
    refreshToken
    user {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
}
```

**Expected Response:**
```json
{
  "data": {
    "register": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "user-uuid-here",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "user",
        "createdAt": "2025-10-22T23:30:00Z",
        "updatedAt": "2025-10-22T23:30:00Z"
      }
    }
  }
}
```

### Register with Variables
```graphql
mutation RegisterUser($input: RegisterInput!) {
  register(input: $input) {
    token
    refreshToken
    user {
      id
      name
      email
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "password": "AnotherSecurePassword456!"
  }
}
```

---

## User Login

### Login User
```graphql
mutation LoginUser {
  login(input: {
    email: "john.doe@example.com"
    password: "SecurePassword123!"
  }) {
    token
    refreshToken
    user {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
}
```

**Expected Response:**
```json
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "user-uuid-here",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "user",
        "createdAt": "2025-10-22T23:30:00Z",
        "updatedAt": "2025-10-22T23:30:00Z"
      }
    }
  }
}
```

### Login with Variables
```graphql
mutation LoginUser($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "email": "john.doe@example.com",
    "password": "SecurePassword123!"
  }
}
```

---

## Token Validation

### Validate JWT Token
```graphql
query ValidateUserToken {
  validateToken(token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...") {
    valid
    message
    user {
      id
      name
      email
    }
  }
}
```

**Expected Response (Valid Token):**
```json
{
  "data": {
    "validateToken": {
      "valid": true,
      "message": "Token is valid",
      "user": {
        "id": "user-uuid-here",
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
  }
}
```

**Expected Response (Invalid Token):**
```json
{
  "data": {
    "validateToken": {
      "valid": false,
      "message": "Token is invalid or expired",
      "user": null
    }
  }
}
```

### Validate with Variables
```graphql
query ValidateUserToken($token: String!) {
  validateToken(token: $token) {
    valid
    message
  }
}
```

**Variables:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Error Handling Examples

### Registration with Existing Email
```graphql
mutation RegisterDuplicateUser {
  register(input: {
    name: "Duplicate User"
    email: "john.doe@example.com"
    password: "Password123!"
  }) {
    token
    user {
      id
    }
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "registration failed: email already exists",
      "path": ["register"]
    }
  ],
  "data": {
    "register": null
  }
}
```

### Login with Invalid Credentials
```graphql
mutation LoginInvalidCredentials {
  login(input: {
    email: "john.doe@example.com"
    password: "WrongPassword"
  }) {
    token
    user {
      id
    }
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "login failed: invalid credentials",
      "path": ["login"]
    }
  ],
  "data": {
    "login": null
  }
}
```

---

## Combined Operations

### Register and Login Flow
```graphql
# Step 1: Register
mutation RegisterUser {
  register(input: {
    name: "Test User"
    email: "test@example.com"
    password: "TestPassword123!"
  }) {
    token
    user {
      id
      email
    }
  }
}

# Step 2: Validate the token received
query ValidateToken($token: String!) {
  validateToken(token: $token) {
    valid
    message
  }
}

# Step 3: Login with same credentials
mutation LoginUser {
  login(input: {
    email: "test@example.com"
    password: "TestPassword123!"
  }) {
    token
    refreshToken
  }
}
```

---

## Testing Workflow

### 1. Start Services
```bash
# Terminal 1: Start auth service
cd /home/zenith/Desktop/Code/ConQ/backend/auth-service
go run main.go

# Terminal 2: Start API gateway
cd /home/zenith/Desktop/Code/ConQ/backend/api-gateway
go run main.go
```

### 2. Access GraphQL Playground
Open browser to: http://localhost:8080/playground

### 3. Test Sequence
1. **Health Check**: Verify service is running
2. **Register**: Create a new user account
3. **Validate Token**: Check the token from registration
4. **Login**: Authenticate with the new account
5. **Validate Token**: Check the token from login

### 4. Error Testing
- Try registering with the same email twice
- Try logging in with wrong password
- Try validating an expired or invalid token

---

## cURL Examples

### Health Check
```bash
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ health }"}'
```

### Register
```bash
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($input: RegisterInput!) { register(input: $input) { token user { id email } } }",
    "variables": {
      "input": {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "SecurePassword123!"
      }
    }
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($input: LoginInput!) { login(input: $input) { token user { id email } } }",
    "variables": {
      "input": {
        "email": "john@example.com",
        "password": "SecurePassword123!"
      }
    }
  }'
```

### Validate Token
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d "{
    \"query\": \"query(\$token: String!) { validateToken(token: \$token) { valid message } }\",
    \"variables\": {
      \"token\": \"$TOKEN\"
    }
  }"
```

---

## Notes

1. **Token Storage**: In a real application, store tokens securely (httpOnly cookies or secure storage)
2. **Token Expiration**: JWT tokens have expiration times - use refresh tokens to get new access tokens
3. **Error Messages**: Error messages from the auth service are propagated to GraphQL responses
4. **Field Selection**: Only request the fields you need to optimize response size
5. **Variables**: Use GraphQL variables for dynamic values instead of string interpolation
