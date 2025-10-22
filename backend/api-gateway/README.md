# API Gateway

GraphQL API Gateway for Conq. This service acts as the entry point for all frontend applications.

## Purpose

- Exposes GraphQL API on port 8080
- Routes requests to appropriate microservices via gRPC
- Handles authentication and authorization
- CORS configuration for web clients

## Technology

- **Chi**: HTTP router and middleware
- **gqlgen**: GraphQL server for Go
- **gRPC**: Communication with microservices
- **CORS**: Cross-origin resource sharing

## Running

```bash
go run main.go
```

Or:

```bash
PORT=8080 go run main.go
```

## GraphQL Endpoint

```
POST http://localhost:8080/graphql
```

## Health Check

```
GET http://localhost:8080/health
```

## Configuration

Environment variables:

```bash
PORT=8080
```

## Development

### Adding GraphQL Schema

1. Define schema in `graph/schema.graphql`
2. Generate code: `go run github.com/99designs/gqlgen generate`
3. Implement resolvers in `graph/schema.resolvers.go`

### Example Query

```graphql
query {
  contents {
    id
    title
    body
    status
  }
}
```

### Example Mutation

```graphql
mutation {
  createContent(input: {
    title: "My Post"
    body: "Content here"
    platforms: ["instagram", "facebook"]
  }) {
    id
    title
  }
}
```
