# Component Visualization Test - Mermaid Diagrams

This document demonstrates Mermaid diagram capabilities for documenting ConQ's component architecture.

## ConQ Component Architecture

### 1. Authentication Flow

```mermaid
graph TD
    A[User] -->|Credentials| B[Login Page]
    B -->|GraphQL Mutation| C[API Gateway]
    C -->|gRPC Call| D[Auth Service]
    D -->|Validate| E[MongoDB]
    E -->|User Data| D
    D -->|JWT Tokens| C
    C -->|Tokens| B
    B -->|Store in localStorage| F[Apollo Client]
    F -->|Authorization Header| C
```

### 2. Main App Component Hierarchy

```mermaid
graph TD
    App[App Component] --> Providers[Providers]
    Providers --> Apollo[Apollo Provider]
    Providers --> Theme[Theme Provider]

    App --> Layout[Layout Component]
    Layout --> Header[Header]
    Layout --> Sidebar[Sidebar]
    Layout --> Main[Main Content]
    Layout --> Footer[Footer]

    Main --> Routes{Route Handler}
    Routes --> Home[Home Page]
    Routes --> Dashboard[Dashboard]
    Routes --> Auth[Auth Pages]

    Auth --> Login[Login]
    Auth --> Register[Register]

    Dashboard --> Content[Content Manager]
    Dashboard --> Analytics[Analytics]
    Dashboard --> Schedule[Scheduler]
```

### 3. Theme System Architecture

```mermaid
flowchart LR
    User[User Selection] --> TS[ThemeSelector Component]
    TS --> TC[ThemeContext]
    TC --> LS[localStorage]
    TC --> CSS[CSS Variables]
    CSS --> Components[All Components]

    Themes[themes.json] --> TS
    Themes --> CSS
```

### 4. GraphQL Data Flow

```mermaid
sequenceDiagram
    participant UI as React Component
    participant AC as Apollo Client
    participant AG as API Gateway
    participant AS as Auth Service
    participant DB as MongoDB

    UI->>AC: Execute Mutation
    AC->>AG: GraphQL Request (with JWT)
    AG->>AG: Validate Token
    AG->>AS: gRPC Call
    AS->>DB: Query/Update
    DB->>AS: Result
    AS->>AG: Response
    AG->>AC: GraphQL Response
    AC->>UI: Update State
```

### 5. Service Communication

```mermaid
graph TB
    subgraph Frontend
        Next[Next.js App]
        Apollo[Apollo Client]
    end

    subgraph Backend
        Gateway[API Gateway :8080]
        Auth[Auth Service :50051]
        Content[Content Service]
        Teams[Teams Service]
    end

    subgraph Data Layer
        Mongo[(MongoDB)]
        Redis[(Redis)]
        MinIO[(MinIO S3)]
        NATS[NATS Message Broker]
    end

    Next <-->|GraphQL| Gateway
    Apollo <-->|GraphQL| Gateway
    Gateway <-->|gRPC| Auth
    Gateway <-->|gRPC| Content
    Gateway <-->|gRPC| Teams

    Auth <--> Mongo
    Auth <--> Redis
    Content <--> Mongo
    Content <--> MinIO
    Teams <--> Mongo

    Auth -.->|Events| NATS
    Content -.->|Events| NATS
    Teams -.->|Events| NATS
```

### 6. Component Diagram (C4 Style)

```mermaid
C4Component
    title Component Diagram for ConQ Frontend

    Container_Boundary(frontend, "Next.js Frontend") {
        Component(pages, "Pages", "Next.js Pages", "App Router pages")
        Component(components, "UI Components", "React Components", "Reusable UI elements")
        Component(apollo, "Apollo Client", "GraphQL Client", "Manages GraphQL state")
        Component(theme, "Theme System", "CSS Variables", "Dynamic theming")
    }

    Container_Boundary(backend, "Backend Services") {
        Component(gateway, "API Gateway", "GraphQL + Chi", "API entry point")
        Component(authsvc, "Auth Service", "gRPC", "Authentication")
    }

    Rel(pages, components, "Uses")
    Rel(pages, apollo, "Queries/Mutations")
    Rel(components, theme, "Applies")
    Rel(apollo, gateway, "GraphQL over HTTP")
    Rel(gateway, authsvc, "gRPC calls")
```

### 7. State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated

    Unauthenticated --> Authenticating: Login Attempt
    Authenticating --> Authenticated: Success
    Authenticating --> Unauthenticated: Failure

    Authenticated --> LoadingData: Fetch User Data
    LoadingData --> Ready: Data Loaded
    LoadingData --> Error: Load Failed

    Error --> Ready: Retry Success

    Ready --> Unauthenticated: Logout
    Ready --> TokenRefresh: Token Expired
    TokenRefresh --> Ready: Refresh Success
    TokenRefresh --> Unauthenticated: Refresh Failed
```

### 8. File Structure

```mermaid
graph LR
    Root[ConQ] --> Frontend[frontend/]
    Root --> Backend[backend/]

    Frontend --> Web[web/]
    Web --> App[app/]
    Web --> Comp[components/]
    Web --> Lib[lib/]
    Web --> Hooks[hooks/]

    Backend --> Services[services/]
    Backend --> Gateway[api-gateway/]
    Backend --> Shared[shared/]

    Services --> Auth[auth-service/]
    Services --> Content[content-service/]
    Services --> Teams[teams-service/]
```

## How to View These Diagrams

### Option 1: GitHub/GitLab
GitHub and GitLab automatically render Mermaid diagrams in markdown files.

### Option 2: VS Code
Install the "Markdown Preview Mermaid Support" extension.

### Option 3: Online
Use https://mermaid.live/ to preview and edit diagrams.

### Option 4: In ConQ App
We can use the `mermaid` package to render these dynamically in our Next.js app.

## Mermaid Diagram Types Available

- **Flowchart**: Process flows and component relationships
- **Sequence Diagram**: Interaction between components over time
- **Class Diagram**: Object-oriented structure
- **State Diagram**: State transitions
- **ER Diagram**: Database relationships
- **Gantt Chart**: Project timelines
- **C4 Diagram**: Software architecture (experimental)
- **Git Graph**: Version control flows

## Benefits for ConQ

1. **Documentation as Code**: Diagrams live with the codebase
2. **Version Controlled**: Track changes to architecture over time
3. **Easy to Update**: Text-based, no specialized tools needed
4. **Consistent Style**: Auto-generated formatting
5. **Developer Friendly**: Write diagrams like you write code
