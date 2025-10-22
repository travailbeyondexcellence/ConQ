# Conq Project Structure - Complete File Tree

## 📁 Complete Directory Structure

```
conq/
│
├── 📄 README.md                          # Main project README
├── 📄 .gitignore                         # Git ignore rules
├── 📄 docker-compose.yml                 # Infrastructure services
│
├── 📂 frontend/                          # All frontend applications
│   │
│   ├── 📂 web/                          # Next.js 15 Web Application
│   │   ├── 📄 package.json              # Dependencies
│   │   ├── 📄 tsconfig.json             # TypeScript config
│   │   ├── 📄 next.config.js            # Next.js config
│   │   ├── 📄 tailwind.config.js        # Tailwind CSS config
│   │   ├── 📄 README.md                 # Web app documentation
│   │   ├── 📂 app/                      # Next.js App Router
│   │   │   ├── 📄 layout.tsx            # Root layout
│   │   │   ├── 📄 page.tsx              # Home page
│   │   │   ├── 📄 globals.css           # Global styles
│   │   │   ├── 📂 dashboard/            # Dashboard pages
│   │   │   ├── 📂 content/              # Content management
│   │   │   ├── 📂 calendar/             # Calendar view
│   │   │   └── 📂 analytics/            # Analytics pages
│   │   ├── 📂 components/               # React components
│   │   ├── 📂 lib/                      # Utils & configs
│   │   │   └── 📄 apollo-client.ts      # GraphQL client
│   │   └── 📂 public/                   # Static assets
│   │
│   ├── 📂 android/                      # Native Android App (Kotlin)
│   │   ├── 📄 build.gradle              # Root build config
│   │   ├── 📄 README.md                 # Android documentation
│   │   └── 📂 app/
│   │       ├── 📄 build.gradle          # App build config
│   │       └── 📂 src/main/
│   │           ├── 📄 AndroidManifest.xml
│   │           └── 📂 java/com/conq/app/
│   │               └── 📄 MainActivity.kt
│   │
│   └── 📂 ios/                          # Native iOS App (Swift)
│       ├── 📄 Package.swift             # Swift Package Manager
│       ├── 📄 README.md                 # iOS documentation
│       └── 📂 Conq/
│           ├── 📄 ConqApp.swift         # App entry point
│           ├── 📂 Views/
│           │   └── 📄 ContentView.swift
│           ├── 📂 ViewModels/
│           ├── 📂 Models/
│           ├── 📂 Services/
│           │   └── 📄 Network.swift     # GraphQL client
│           └── 📂 Resources/
│
├── 📂 backend/                          # All backend services
│   │
│   ├── 📂 api-gateway/                  # GraphQL API Gateway
│   │   ├── 📄 go.mod                    # Go dependencies
│   │   └── 📄 main.go                   # Gateway server
│   │
│   ├── 📂 services/                     # Microservices
│   │   │
│   │   ├── 📂 auth-service/             # Authentication (Port 50051)
│   │   │   ├── 📄 go.mod
│   │   │   └── 📄 main.go
│   │   │
│   │   ├── 📂 user-service/             # User Management (Port 50052)
│   │   │   └── 📄 go.mod
│   │   │
│   │   ├── 📂 content-service/          # Content CRUD (Port 50053)
│   │   │   ├── 📄 go.mod
│   │   │   └── 📄 README.md
│   │   │
│   │   ├── 📂 media-service/            # Media Upload (Port 50056)
│   │   │   └── 📄 go.mod
│   │   │
│   │   ├── 📂 scheduler-service/        # Post Scheduling (Port 50054)
│   │   │   ├── 📄 go.mod
│   │   │   └── 📄 README.md
│   │   │
│   │   ├── 📂 publisher-service/        # Publishing (Port 50055)
│   │   │   └── 📄 go.mod
│   │   │
│   │   ├── 📂 approval-service/         # Workflow Approval (Port 50057)
│   │   │   └── 📄 go.mod
│   │   │
│   │   ├── 📂 analytics-service/        # Analytics (Port 50058)
│   │   │   └── 📄 go.mod
│   │   │
│   │   ├── 📂 notification-service/     # Notifications (Port 50059)
│   │   │   └── 📄 go.mod
│   │   │
│   │   └── 📂 platform-connectors/      # Social Media APIs
│   │       ├── 📂 youtube/              # YouTube (Port 50061)
│   │       ├── 📂 instagram/            # Instagram (Port 50062)
│   │       ├── 📂 tiktok/               # TikTok (Port 50063)
│   │       ├── 📂 facebook/             # Facebook (Port 50064)
│   │       ├── 📂 linkedin/             # LinkedIn (Port 50065)
│   │       └── 📂 twitter/              # Twitter/X (Port 50066)
│   │
│   ├── 📂 shared/                       # Shared code & configs
│   │   ├── 📂 proto/                    # Protocol Buffer definitions
│   │   │   └── 📄 common.proto          # Common message types
│   │   ├── 📂 utils/                    # Shared utilities
│   │   └── 📂 config/                   # Shared configurations
│   │
│   └── 📂 scripts/                      # Helper scripts
│       ├── 📄 start-all-services.sh     # Start all services
│       └── 📄 stop-all-services.sh      # Stop all services
│
├── 📂 docs/                             # Documentation
│   ├── 📄 ARCHITECTURE.md               # System architecture
│   ├── 📄 DEVELOPMENT_SETUP.md          # Setup guide
│   └── 📄 QUICK_START.md                # Quick start guide
│
└── 📂 infra/                            # Infrastructure configs
    ├── 📂 docker/                       # Docker configs
    └── 📂 k8s/                          # Kubernetes manifests
```

## 📊 File Count Summary

### Frontend
- **Web**: 8 TypeScript/React files + configs
- **Android**: 3 Kotlin files + configs
- **iOS**: 3 Swift files + configs

### Backend
- **API Gateway**: 1 main server
- **Microservices**: 10 services (each with go.mod + main.go)
- **Platform Connectors**: 6 connector services
- **Shared**: Protocol buffers + utilities

### Infrastructure
- **Docker Compose**: MongoDB, Redis, NATS, MinIO setup
- **Scripts**: Service management scripts

### Documentation
- 3 comprehensive markdown docs
- Service-specific READMEs

## 🎯 Key Files by Purpose

### Getting Started
1. 📄 `README.md` - Start here
2. 📄 `docs/QUICK_START.md` - 5-minute setup
3. 📄 `docker-compose.yml` - Infrastructure

### Development
1. 📄 `docs/DEVELOPMENT_SETUP.md` - Detailed setup
2. 📄 `backend/scripts/start-all-services.sh` - Start backend
3. 📄 `frontend/web/package.json` - Frontend deps

### Architecture
1. 📄 `docs/ARCHITECTURE.md` - System design
2. 📄 `backend/shared/proto/common.proto` - gRPC contracts
3. 📄 `backend/api-gateway/main.go` - API Gateway

### Service Implementation
1. 📄 `backend/services/auth-service/main.go` - Auth example
2. 📄 `backend/services/content-service/README.md` - Service docs
3. 📄 `backend/services/scheduler-service/README.md` - Scheduler docs

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Infrastructure services |
| `package.json` | Web dependencies |
| `go.mod` | Go service dependencies |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.js` | Tailwind CSS setup |
| `next.config.js` | Next.js configuration |
| `.gitignore` | Git ignore patterns |

## 📝 Documentation Files

| File | Content |
|------|---------|
| `README.md` | Project overview |
| `PROJECT_SUMMARY.md` | Complete tech summary |
| `docs/ARCHITECTURE.md` | System architecture |
| `docs/DEVELOPMENT_SETUP.md` | Setup instructions |
| `docs/QUICK_START.md` | Quick start guide |
| `frontend/web/README.md` | Web app docs |
| `frontend/android/README.md` | Android docs |
| `frontend/ios/README.md` | iOS docs |

## 🚀 Executable Scripts

| Script | Purpose |
|--------|---------|
| `backend/scripts/start-all-services.sh` | Start all microservices |
| `backend/scripts/stop-all-services.sh` | Stop all services |

## 📦 Technology Files

### Go (Backend)
- 📄 `*.go` - Go source files
- 📄 `go.mod` - Module dependencies
- 📄 `*.proto` - Protocol Buffer definitions

### TypeScript (Web)
- 📄 `*.tsx` - React components
- 📄 `*.ts` - TypeScript files
- 📄 `tsconfig.json` - TypeScript config

### Kotlin (Android)
- 📄 `*.kt` - Kotlin source files
- 📄 `build.gradle` - Build configuration
- 📄 `AndroidManifest.xml` - App manifest

### Swift (iOS)
- 📄 `*.swift` - Swift source files
- 📄 `Package.swift` - Dependencies

## 🎨 Frontend Platforms

```
┌─────────────────────────────────────┐
│         Frontend Clients            │
├─────────────────────────────────────┤
│  Web (Next.js)     │ Port 3000     │
│  Android (Kotlin)  │ Native        │
│  iOS (Swift)       │ Native        │
└─────────────────────────────────────┘
            │
            │ GraphQL
            ▼
┌─────────────────────────────────────┐
│      API Gateway (Go)               │
│      Port 8080                      │
└─────────────────────────────────────┘
```

## 🔧 Backend Microservices

```
┌────────────────────────────────────────────────────┐
│              Microservices Layer                   │
├────────────────────────────────────────────────────┤
│  Auth Service          │ Port 50051               │
│  User Service          │ Port 50052               │
│  Content Service       │ Port 50053               │
│  Scheduler Service     │ Port 50054               │
│  Publisher Service     │ Port 50055               │
│  Media Service         │ Port 50056               │
│  Approval Service      │ Port 50057               │
│  Analytics Service     │ Port 50058               │
│  Notification Service  │ Port 50059               │
├────────────────────────────────────────────────────┤
│         Platform Connectors                        │
├────────────────────────────────────────────────────┤
│  YouTube    │ Instagram  │ TikTok                 │
│  Facebook   │ LinkedIn   │ Twitter                │
│  50061-50066                                       │
└────────────────────────────────────────────────────┘
```

## 💾 Infrastructure Services

```
┌────────────────────────────────────────────────────┐
│           Infrastructure Layer                     │
├────────────────────────────────────────────────────┤
│  MongoDB          │ Port 27017  │ Database        │
│  Redis            │ Port 6379   │ Cache           │
│  NATS             │ Port 4222   │ Message Queue   │
│  MinIO            │ Port 9000   │ Object Storage  │
│  Mongo Express    │ Port 8081   │ DB Admin UI     │
└────────────────────────────────────────────────────┘
```

## 📈 Total Files Created

- **Go Files**: 15+ (services + gateway)
- **TypeScript/React**: 8+ (web frontend)
- **Kotlin**: 3+ (Android)
- **Swift**: 3+ (iOS)
- **Config Files**: 10+ (various configs)
- **Documentation**: 10+ (markdown files)
- **Scripts**: 2 (bash scripts)
- **Proto**: 1 (Protocol Buffers)

**Total: 50+ files across the entire stack!**
