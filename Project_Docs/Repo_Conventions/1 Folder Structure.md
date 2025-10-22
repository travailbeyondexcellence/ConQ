# ConQ Repository Folder Structure

This document describes the purpose and contents of each major folder in the ConQ repository.

## Root Level Folders

### `.agents/`
**Purpose**: Contains agent-specific instructions for specialized AI assistants

**What's Inside**:
- `ui-agent-instructions.md` - Instructions for UI/Frontend agents
- `backend-agent-instructions.md` - Instructions for Backend/Service agents
- `database-agent-instructions.md` - Instructions for Database agents
- `testing-agent-instructions.md` - Instructions for Testing agents
- `docs-agent-instructions.md` - Instructions for Documentation agents

**Git Tracked**: ✅ Yes

**Why It Exists**:
When multiple AI agents collaborate on the codebase, each specialized agent needs clear instructions about:
- Their specific responsibilities
- Coding standards to follow
- Tools and frameworks they should use
- Common patterns and best practices
- File locations and naming conventions

### `Repo_Structure/`
**Purpose**: Documents the complete repository structure and organization

**What's Inside**:
- Directory hierarchy documentation
- Module organization guides
- Service boundary definitions
- File naming pattern guides
- Configuration file locations

**Git Tracked**: ✅ Yes

**Why It Exists**:
Serves as a map for navigating the codebase. Helps new developers and agents quickly understand where different types of files are located and how the project is organized.

### `Project_Docs/`
**Purpose**: Contains comprehensive project documentation

**What's Inside**:
- Architecture Decision Records (ADRs)
- API documentation
- System design documents
- Feature specifications
- Integration guides
- Deployment procedures
- Technical specifications
- User guides

**Git Tracked**: ✅ Yes

**Why It Exists**:
Centralizes all project documentation so team members and agents can understand the system architecture, design decisions, and implementation details.

### `Project_Updates/`
**Purpose**: Tracks chronological implementation progress and changes

**What's Inside**:
- Implementation update logs
- Feature completion notes
- Bug fix records
- Refactoring summaries
- Dependency update notes
- Performance improvement logs
- Breaking change notifications

**Git Tracked**: ✅ Yes

**Format**: Each update includes:
- Date of implementation
- Description of changes
- Files modified
- Related issues/tickets
- Migration notes (if applicable)

**Why It Exists**:
Provides a historical record of what has been implemented, when, and by whom. Helps track project progress and understand the evolution of the codebase.

### `Repo_Conventions/`
**Purpose**: Defines repository conventions, standards, and metadata

**What's Inside**:
- `0 Conventions.md` - Main conventions document
- `1 Folder Structure.md` - This file
- Coding standards
- Commit message formats
- Branch naming conventions
- Pull request guidelines
- Code review checklists
- CI/CD pipeline documentation

**Git Tracked**: ✅ Yes

**Why It Exists**:
Ensures all contributors follow consistent conventions for code style, git workflow, documentation, and collaboration. Makes the codebase more maintainable and professional.

---

## Application Folders

### `frontend/`
**Purpose**: Contains all frontend application code

**Structure**:
```
frontend/
└── web/                    # Next.js web application
    ├── app/               # Next.js App Router pages
    ├── components/        # Reusable React components
    ├── context/           # React Context providers
    ├── graphql/           # GraphQL queries & mutations
    ├── hooks/             # Custom React hooks
    ├── lib/               # Utility libraries
    └── public/            # Static assets
```

**Git Tracked**: ✅ Yes (except `node_modules/`, `.next/`, `dist/`)

### `backend/`
**Purpose**: Contains all backend microservices and API gateway

**Structure**:
```
backend/
├── api-gateway/           # GraphQL API Gateway
│   ├── client/           # gRPC clients
│   ├── graph/            # GraphQL schema & resolvers
│   └── main.go
├── services/             # Microservices
│   ├── auth-service/
│   ├── user-service/
│   ├── content-service/
│   └── ...
└── shared/               # Shared code
    ├── config/           # Configuration utilities
    ├── proto/            # Protobuf definitions
    └── utils/            # Common utilities
```

**Git Tracked**: ✅ Yes (except `bin/`, `*.exe`, temp files)

---

## Configuration & Infrastructure

### `.env` Files
- `.env.example` - Template with all environment variables (✅ tracked)
- `.env` - Actual environment variables with secrets (❌ not tracked)

### `docker-compose.yml`
**Purpose**: Defines all infrastructure services
- MongoDB
- Redis
- NATS
- MinIO
- Mongo Express

**Git Tracked**: ✅ Yes

### `.gitignore`
**Purpose**: Specifies which files Git should ignore

**Notable Exclusions**:
- `node_modules/`
- `.next/`
- `dist/`
- `bin/`
- `.env` (but NOT `.env.example`)
- IDE-specific files

**Notable Inclusions** (NOT ignored):
- `.agents/` - Agent instructions
- `Repo_Conventions/` - Convention docs
- `Repo_Structure/` - Structure docs
- `Project_Docs/` - Project documentation
- `Project_Updates/` - Update logs

---

## File Naming Conventions

### Documentation Files
- Use descriptive names with spaces: `API Integration Guide.md`
- Number important files: `0 Conventions.md`, `1 Getting Started.md`
- Use sentence case

### Code Files
- **Frontend**: `kebab-case.tsx`, `PascalCase` for components
- **Backend**: `snake_case.go` for packages, `PascalCase` for types
- **Configuration**: `lowercase-with-hyphens.yml`

---

## Quick Reference

| Folder | Purpose | Git Tracked | Who Uses It |
|--------|---------|-------------|-------------|
| `.agents/` | Agent-specific instructions | ✅ Yes | AI Agents |
| `Repo_Structure/` | Repository structure docs | ✅ Yes | All |
| `Project_Docs/` | Technical documentation | ✅ Yes | All |
| `Project_Updates/` | Implementation changelog | ✅ Yes | All |
| `Repo_Conventions/` | Coding & workflow standards | ✅ Yes | All |
| `frontend/` | Web application code | ✅ Yes | Frontend Devs/Agents |
| `backend/` | Server & microservices | ✅ Yes | Backend Devs/Agents |

---

## Adding New Folders

When creating a new top-level folder:

1. **Document it here** - Add section describing purpose
2. **Update `.gitignore`** - Decide if it should be tracked
3. **Add to README** - Update main README.md
4. **Inform team** - Announce in Project_Updates

---

**Last Updated**: 2025-10-23
**Next Review**: When major structure changes occur
