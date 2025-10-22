'use client';

import React from 'react';
import MermaidDiagram from '@/components/MermaidDiagram';

export default function MermaidTestPage() {
  const authFlowDiagram = `
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
  `;

  const componentHierarchy = `
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
  `;

  const sequenceDiagram = `
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
  `;

  const stateDiagram = `
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
  `;

  const serviceArchitecture = `
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
  `;

  return (
    <div style={{ backgroundColor: 'rgb(var(--background))' }} className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: 'rgb(var(--foreground))' }}
        >
          Mermaid Diagram Visualization
        </h1>
        <p
          className="mb-6 text-lg"
          style={{ color: 'rgb(var(--muted-foreground))' }}
        >
          Dynamic rendering of architecture diagrams using Mermaid.js
        </p>

        <div className="space-y-8">
          {/* Authentication Flow */}
          <section className="p-6 rounded-lg" style={{ backgroundColor: 'rgb(var(--card))', border: '1px solid rgb(var(--border))' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgb(var(--foreground))' }}>
              1. Authentication Flow
            </h2>
            <MermaidDiagram chart={authFlowDiagram} />
          </section>

          {/* Component Hierarchy */}
          <section className="p-6 rounded-lg" style={{ backgroundColor: 'rgb(var(--card))', border: '1px solid rgb(var(--border))' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgb(var(--foreground))' }}>
              2. Component Hierarchy
            </h2>
            <MermaidDiagram chart={componentHierarchy} />
          </section>

          {/* Sequence Diagram */}
          <section className="p-6 rounded-lg" style={{ backgroundColor: 'rgb(var(--card))', border: '1px solid rgb(var(--border))' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgb(var(--foreground))' }}>
              3. GraphQL Data Flow (Sequence Diagram)
            </h2>
            <MermaidDiagram chart={sequenceDiagram} />
          </section>

          {/* State Diagram */}
          <section className="p-6 rounded-lg" style={{ backgroundColor: 'rgb(var(--card))', border: '1px solid rgb(var(--border))' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgb(var(--foreground))' }}>
              4. Authentication State Machine
            </h2>
            <MermaidDiagram chart={stateDiagram} />
          </section>

          {/* Service Architecture */}
          <section className="p-6 rounded-lg" style={{ backgroundColor: 'rgb(var(--card))', border: '1px solid rgb(var(--border))' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgb(var(--foreground))' }}>
              5. Service Architecture
            </h2>
            <MermaidDiagram chart={serviceArchitecture} />
          </section>

          {/* Info Section */}
          <section className="p-6 rounded-lg" style={{ backgroundColor: 'rgb(var(--card))', border: '1px solid rgb(var(--border))' }}>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: 'rgb(var(--foreground))' }}>
              About Mermaid Diagrams
            </h2>
            <div className="space-y-3" style={{ color: 'rgb(var(--muted-foreground))' }}>
              <p>
                <strong style={{ color: 'rgb(var(--foreground))' }}>Library:</strong> Mermaid.js v11.12.0
              </p>
              <p>
                <strong style={{ color: 'rgb(var(--foreground))' }}>Purpose:</strong> Text-based diagram generation for documentation
              </p>
              <p>
                <strong style={{ color: 'rgb(var(--foreground))' }}>Diagram Types Available:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Flowcharts (shown above)</li>
                <li>Sequence Diagrams (shown above)</li>
                <li>State Diagrams (shown above)</li>
                <li>Class Diagrams</li>
                <li>Entity Relationship Diagrams</li>
                <li>Gantt Charts</li>
                <li>Git Graphs</li>
                <li>C4 Diagrams (experimental)</li>
              </ul>
              <p className="mt-4">
                <strong style={{ color: 'rgb(var(--foreground))' }}>Benefits:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Version controlled (text-based)</li>
                <li>Easy to update and maintain</li>
                <li>No special tools required</li>
                <li>Consistent styling</li>
                <li>Theme-aware (integrates with ConQ themes)</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
