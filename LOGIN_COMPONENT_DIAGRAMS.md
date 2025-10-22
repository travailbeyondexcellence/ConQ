# Login Component - Mermaid Diagram Examples

This document demonstrates the **same Login component** visualized using three different Mermaid diagram types:
1. **Flowchart** - Process flow and logic
2. **C4 Component Diagram** - Software architecture view
3. **Block Diagram** - Structural composition

---

## 1. Flowchart - Login Process Flow

Shows the **step-by-step process** when a user attempts to login.

```mermaid
flowchart TD
    Start([User Opens Login Page]) --> LoadPage[Load Login Component]
    LoadPage --> Display[Display Login Form]

    Display --> UserInput{User Enters Credentials?}
    UserInput -->|No| Display
    UserInput -->|Yes| Validate[Client-side Validation]

    Validate --> ValidCheck{Valid Format?}
    ValidCheck -->|No| ShowError[Show Validation Error]
    ShowError --> Display

    ValidCheck -->|Yes| Submit[Submit Login Mutation]
    Submit --> Loading[Show Loading State]

    Loading --> GraphQL[Apollo Client sends GraphQL Request]
    GraphQL --> Gateway[API Gateway Receives Request]
    Gateway --> AuthService[Auth Service validates credentials]
    AuthService --> DB[(Check MongoDB)]

    DB --> UserFound{User Exists?}
    UserFound -->|No| ReturnError[Return Error]
    UserFound -->|Yes| CheckPassword{Password Correct?}

    CheckPassword -->|No| ReturnError
    CheckPassword -->|Yes| GenerateTokens[Generate JWT Tokens]

    GenerateTokens --> ReturnSuccess[Return Success + Tokens]
    ReturnSuccess --> StoreTokens[Store in localStorage]
    StoreTokens --> UpdateState[Update Apollo Cache]
    UpdateState --> Redirect[Redirect to Dashboard]
    Redirect --> End([Login Complete])

    ReturnError --> ShowLoginError[Display Login Error]
    ShowLoginError --> Display

    style Start fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff
    style End fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff
    style ShowError fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
    style ShowLoginError fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
    style GenerateTokens fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style StoreTokens fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
```

**Use Case**: Understanding the **logic flow** and **decision points** in the login process.

---

## 2. C4 Component Diagram - Login Architecture

Shows **how components interact** within the login system at an architectural level.

```mermaid
C4Component
    title Component Diagram - Login System

    Container_Boundary(frontend, "Next.js Frontend") {
        Component(loginPage, "Login Page", "Next.js Page", "User-facing login interface")
        Component(loginForm, "Login Form Component", "React Component", "Handles form input and validation")
        Component(apolloClient, "Apollo Client", "GraphQL Client", "Manages GraphQL queries/mutations")
        Component(authContext, "Auth Context", "React Context", "Manages authentication state")
        Component(localStorage, "Local Storage", "Browser API", "Persists JWT tokens")
    }

    Container_Boundary(backend, "Backend Services") {
        Component(apiGateway, "API Gateway", "GraphQL Server", "Handles GraphQL requests and routing")
        Component(authResolver, "Auth Resolver", "GraphQL Resolver", "Processes login mutation")
        Component(authService, "Auth Service", "gRPC Service", "Business logic for authentication")
        Component(jwtManager, "JWT Manager", "Go Module", "Generates and validates tokens")
        Component(passwordHash, "Password Hasher", "Bcrypt Module", "Verifies password hashes")
    }

    Container_Boundary(data, "Data Layer") {
        ComponentDb(mongodb, "MongoDB", "Database", "Stores user credentials and data")
        ComponentDb(redis, "Redis", "Cache", "Stores token blacklist")
    }

    Rel(loginPage, loginForm, "Renders")
    Rel(loginForm, apolloClient, "Executes login mutation")
    Rel(apolloClient, authContext, "Updates auth state")
    Rel(authContext, localStorage, "Stores tokens")

    Rel(apolloClient, apiGateway, "GraphQL over HTTP", "POST /graphql")
    Rel(apiGateway, authResolver, "Routes request")
    Rel(authResolver, authService, "gRPC call", "ValidateCredentials")

    Rel(authService, passwordHash, "Verify password")
    Rel(authService, jwtManager, "Generate tokens")
    Rel(authService, mongodb, "Query user", "Find user by email")
    Rel(authService, redis, "Check blacklist", "Verify not logged out")

    Rel(jwtManager, authResolver, "Returns tokens")
    Rel(authResolver, apolloClient, "GraphQL response")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

**Use Case**: Understanding **component responsibilities** and **communication patterns**.

---

## 3. Block Diagram - Login UI Structure

Shows the **structural composition** and **layout** of the login component.

```mermaid
block-beta
    columns 3

    block:LoginPage
        columns 1
        PageTitle["<h1>Login to ConQ</h1>"]

        block:LoginCard
            columns 1
            CardHeader["Card Header<br/>Welcome Back"]

            block:FormSection
                columns 2
                EmailLabel["Email Label"]
                EmailInput["Email Input Field"]
                PasswordLabel["Password Label"]
                PasswordInput["Password Input Field"]
                RememberMe["Remember Me Checkbox"]
                ForgotPassword["Forgot Password Link"]
            end

            block:ButtonSection
                columns 1
                LoginButton["Login Button<br/>(Primary)"]
                OrDivider["--- OR ---"]
                SocialButtons["Social Login Buttons<br/>(Google, GitHub)"]
            end

            block:FooterSection
                columns 1
                RegisterLink["Don't have an account?<br/>Register"]
            end
        end

        block:ErrorDisplay
            columns 1
            ErrorMessage["Error Message<br/>(Conditional)"]
        end
    end

    block:ContextProviders
        columns 1
        ApolloProvider["Apollo Provider<br/>(GraphQL Client)"]
        ThemeProvider["Theme Provider<br/>(Styling)"]
        AuthProvider["Auth Provider<br/>(State Management)"]
    end

    block:ExternalDeps
        columns 1
        GraphQLAPI["GraphQL API<br/>localhost:8080"]
        LocalStorage["Browser localStorage<br/>(Token Storage)"]
    end

    LoginPage --> ContextProviders
    LoginCard --> ExternalDeps
    FormSection --> ButtonSection
    ButtonSection --> FooterSection

    style LoginPage fill:#3b82f6,stroke:#2563eb,color:#fff
    style LoginCard fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style FormSection fill:#06b6d4,stroke:#0891b2,color:#fff
    style ButtonSection fill:#10b981,stroke:#059669,color:#fff
    style ContextProviders fill:#f59e0b,stroke:#d97706,color:#fff
    style ExternalDeps fill:#ef4444,stroke:#dc2626,color:#fff
```

**Use Case**: Understanding **UI structure**, **layout hierarchy**, and **component composition**.

---

## Comparison: When to Use Each Diagram Type

| Diagram Type | Best For | ConQ Use Cases |
|--------------|----------|----------------|
| **Flowchart** | Process flows, logic, decision trees | User journeys, authentication flows, data processing pipelines |
| **C4 Component** | Software architecture, component interactions | System design, service communication, API structure |
| **Block Diagram** | UI structure, layout composition, hierarchies | Component composition, page layouts, design systems |

---

## Additional Example: Dashboard Component

Let's see the **same Dashboard component** in all three styles:

### Flowchart - Dashboard Data Loading

```mermaid
flowchart LR
    A[Dashboard Mounts] --> B{User Authenticated?}
    B -->|No| C[Redirect to Login]
    B -->|Yes| D[Fetch User Data]

    D --> E[Query GraphQL: me]
    E --> F{Data Loaded?}
    F -->|Error| G[Show Error State]
    F -->|Success| H[Display Dashboard]

    H --> I[Load Analytics Data]
    H --> J[Load Content Data]
    H --> K[Load Schedule Data]

    I --> L[Render Charts]
    J --> M[Render Content Cards]
    K --> N[Render Calendar]

    L --> O[Dashboard Ready]
    M --> O
    N --> O
```

### C4 - Dashboard Architecture

```mermaid
C4Component
    title Dashboard System Components

    Container_Boundary(ui, "Dashboard UI") {
        Component(dashPage, "Dashboard Page", "Next.js", "Main dashboard view")
        Component(analytics, "Analytics Widget", "React", "Charts and metrics")
        Component(contentMgr, "Content Manager", "React", "Content list/grid")
        Component(scheduler, "Scheduler Widget", "React", "Calendar view")
    }

    Container_Boundary(data, "Data Management") {
        Component(apollo, "Apollo Client", "GraphQL", "Data fetching")
        Component(cache, "Apollo Cache", "In-Memory", "Client-side cache")
    }

    Container_Boundary(backend, "Backend") {
        Component(gateway, "API Gateway", "GraphQL", "Data API")
        Component(contentSvc, "Content Service", "gRPC", "Content management")
        Component(analyticsSvc, "Analytics Service", "gRPC", "Metrics tracking")
    }

    Rel(dashPage, analytics, "Renders")
    Rel(dashPage, contentMgr, "Renders")
    Rel(dashPage, scheduler, "Renders")

    Rel(analytics, apollo, "Queries")
    Rel(contentMgr, apollo, "Queries")
    Rel(scheduler, apollo, "Queries")

    Rel(apollo, cache, "Reads/Writes")
    Rel(apollo, gateway, "GraphQL requests")

    Rel(gateway, contentSvc, "gRPC")
    Rel(gateway, analyticsSvc, "gRPC")
```

### Block Diagram - Dashboard Layout

```mermaid
block-beta
    columns 12

    block:Header:12
        Logo
        Nav
        Profile
        ThemeToggle
    end

    space:2

    block:Sidebar:2
        space
        Dashboard["Dashboard"]
        Content["Content"]
        Analytics["Analytics"]
        Schedule["Schedule"]
        Settings["Settings"]
        space
    end

    block:MainContent:10
        columns 10

        block:TopRow:10
            WelcomeCard:5
            QuickStats:5
        end

        block:MiddleRow:10
            AnalyticsChart:7
            RecentActivity:3
        end

        block:BottomRow:10
            ContentPreview:6
            SchedulePreview:4
        end
    end

    style Header fill:#3b82f6,stroke:#2563eb,color:#fff
    style Sidebar fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style MainContent fill:#06b6d4,stroke:#0891b2,color:#fff
    style WelcomeCard fill:#10b981,stroke:#059669,color:#fff
    style AnalyticsChart fill:#f59e0b,stroke:#d97706,color:#fff
```

---

## Recommendations for ConQ

### Use Flowcharts For:
- ✅ User authentication flows
- ✅ Content publishing workflow
- ✅ Error handling logic
- ✅ Data validation processes

### Use C4 Component Diagrams For:
- ✅ Overall system architecture
- ✅ Microservice interactions
- ✅ Frontend-backend communication
- ✅ Third-party integrations

### Use Block Diagrams For:
- ✅ Page layouts and structure
- ✅ Component composition
- ✅ Design system organization
- ✅ UI component hierarchies

---

## Integration with ConQ Documentation

These diagrams can be added to:

1. **README.md** - High-level architecture overview
2. **ARCHITECTURE.md** - Detailed system design
3. **Component READMEs** - Individual component documentation
4. **API Documentation** - Request/response flows
5. **Onboarding Docs** - Help new developers understand the system

All diagrams are:
- ✅ Version controlled (text-based)
- ✅ Easy to update
- ✅ Auto-rendered on GitHub
- ✅ Can be rendered in the app (via MermaidDiagram component)
