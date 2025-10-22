# Content Service

Content management service for creating, reading, updating, and deleting content.

## Port: 50053

## Responsibilities

- Content CRUD operations
- Draft management
- Tagging and categorization
- Content versioning

## gRPC Methods

```protobuf
service ContentService {
  rpc CreateContent(CreateContentRequest) returns (ContentResponse);
  rpc GetContent(GetContentRequest) returns (ContentResponse);
  rpc UpdateContent(UpdateContentRequest) returns (ContentResponse);
  rpc DeleteContent(DeleteContentRequest) returns (DeleteResponse);
  rpc ListContents(ListContentsRequest) returns (ListContentsResponse);
}
```

## Environment Variables

```bash
GRPC_PORT=50053
MONGO_URI=mongodb://admin:password@localhost:27017
DB_NAME=conq
NATS_URL=nats://localhost:4222
```

## Database Collections

- `contents`: Content posts
- `drafts`: Draft versions
- `tags`: Tag definitions

## NATS Events

**Published:**
- `content.post.created` - When content is created
- `content.post.updated` - When content is modified
- `content.post.deleted` - When content is deleted

**Subscribed:**
- `approval.content.approved` - To update status when approved

## Running

```bash
go run main.go
```
