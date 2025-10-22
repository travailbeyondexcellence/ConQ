# ConQ Authentication Architecture - Visual Diagrams

## 1. Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            FRONTEND APPLICATIONS                              │
│                                                                               │
│  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │   Web Client    │  │  Mobile Client   │  │  Desktop Client  │          │
│  │  (Next.js/TS)   │  │  (React Native)  │  │   (Electron)     │          │
│  └────────┬────────┘  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                      │                     │
└───────────┼─────────────────────┼──────────────────────┼─────────────────────┘
            │                     │                      │
            └─────────────────────┴──────────────────────┘
                                  │
                        [HTTP/GraphQL Requests]
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            API GATEWAY (Port 8080)                           │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Chi Router + GraphQL (gqlgen)                                       │   │
│  │  • CORS Middleware                                                   │   │
│  │  • JWT Authentication Middleware                                     │   │
│  │  • Rate Limiting                                                     │   │
│  │  • Request Validation                                                │   │
│  │  • Logging & Monitoring                                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                  │                                           │
└──────────────────────────────────┼───────────────────────────────────────────┘
                                   │
                        [gRPC Service Calls]
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
            ▼                      ▼                      ▼
┌───────────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   AUTH SERVICE        │ │  USER SERVICE    │ │ CONTENT SERVICE  │
│   (Port 50051)        │ │  (Port 50052)    │ │  (Port 50053)    │
│                       │ │                  │ │                  │
│ ✅ Register           │ │ • Profile Mgmt   │ │ • CRUD Ops       │
│ ✅ Login              │ │ • Team Mgmt      │ │ • Draft Mgmt     │
│ ✅ ValidateToken      │ │ • RBAC           │ │ • Tagging        │
│ ❌ Logout             │ │                  │ │                  │
│ ❌ RefreshToken       │ │                  │ │                  │
│ ❌ ForgotPassword     │ │                  │ │                  │
│ ❌ ResetPassword      │ │                  │ │                  │
│ ❌ VerifyEmail        │ │                  │ │                  │
└───────────┬───────────┘ └──────────────────┘ └──────────────────┘
            │
            │
            ├──────────────────────┬──────────────────────┬─────────────────┐
            │                      │                      │                 │
            ▼                      ▼                      ▼                 ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ SCHEDULER        │  │ PUBLISHER        │  │ MEDIA SERVICE    │  │ ANALYTICS        │
│ (Port 50054)     │  │ (Port 50055)     │  │ (Port 50056)     │  │ (Port 50058)     │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                           INFRASTRUCTURE LAYER                               │
│                                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   MongoDB    │  │    Redis     │  │     NATS     │  │    MinIO     │  │
│  │  (Port 27017)│  │  (Port 6379) │  │ (Port 4222)  │  │ (Port 9000)  │  │
│  │              │  │              │  │              │  │              │  │
│  │ • Users      │  │ • Blacklist  │  │ • Events     │  │ • Media      │  │
│  │ • Content    │  │ • Sessions   │  │ • PubSub     │  │ • Files      │  │
│  │ • Teams      │  │ • Cache      │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Authentication Flow - Complete Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         REGISTRATION FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

[Frontend]                [API Gateway]           [Auth Service]         [MongoDB]
    │                           │                        │                   │
    │ POST /graphql            │                        │                   │
    │ mutation { register }    │                        │                   │
    ├──────────────────────────>│                        │                   │
    │                           │                        │                   │
    │                           │ Validate Input         │                   │
    │                           │ (email, password)      │                   │
    │                           │                        │                   │
    │                           │ gRPC Register()        │                   │
    │                           ├───────────────────────>│                   │
    │                           │                        │                   │
    │                           │                        │ Check if email    │
    │                           │                        │ exists            │
    │                           │                        ├──────────────────>│
    │                           │                        │<──────────────────┤
    │                           │                        │ (result)          │
    │                           │                        │                   │
    │                           │                        │ Hash password     │
    │                           │                        │ (bcrypt)          │
    │                           │                        │                   │
    │                           │                        │ Create user       │
    │                           │                        ├──────────────────>│
    │                           │                        │<──────────────────┤
    │                           │                        │ (user_id)         │
    │                           │                        │                   │
    │                           │                        │ Generate JWT      │
    │                           │                        │ (access_token)    │
    │                           │                        │                   │
    │                           │                        │ Publish NATS      │
    │                           │                        │ "auth.user.reg"   │
    │                           │                        │                   │
    │                           │<───────────────────────┤                   │
    │                           │ AuthResponse           │                   │
    │<──────────────────────────┤                        │                   │
    │ { accessToken, user }    │                        │                   │
    │                           │                        │                   │
    │ Store token in           │                        │                   │
    │ localStorage/cookie      │                        │                   │
    │                           │                        │                   │


┌─────────────────────────────────────────────────────────────────────────────┐
│                            LOGIN FLOW                                        │
└─────────────────────────────────────────────────────────────────────────────┘

[Frontend]                [API Gateway]           [Auth Service]         [MongoDB]
    │                           │                        │                   │
    │ POST /graphql            │                        │                   │
    │ mutation { login }       │                        │                   │
    ├──────────────────────────>│                        │                   │
    │                           │                        │                   │
    │                           │ Validate Input         │                   │
    │                           │                        │                   │
    │                           │ gRPC Login()           │                   │
    │                           ├───────────────────────>│                   │
    │                           │                        │                   │
    │                           │                        │ Find user by      │
    │                           │                        │ email             │
    │                           │                        ├──────────────────>│
    │                           │                        │<──────────────────┤
    │                           │                        │ (user)            │
    │                           │                        │                   │
    │                           │                        │ Verify password   │
    │                           │                        │ (bcrypt.Compare)  │
    │                           │                        │                   │
    │                           │                        │ Generate tokens   │
    │                           │                        │ • accessToken     │
    │                           │                        │ • refreshToken    │
    │                           │                        │                   │
    │                           │                        │ Update last_login │
    │                           │                        ├──────────────────>│
    │                           │                        │                   │
    │                           │                        │ Publish NATS      │
    │                           │                        │ "auth.user.login" │
    │                           │                        │                   │
    │                           │<───────────────────────┤                   │
    │<──────────────────────────┤                        │                   │
    │ { accessToken,           │                        │                   │
    │   refreshToken, user }   │                        │                   │
    │                           │                        │                   │


┌─────────────────────────────────────────────────────────────────────────────┐
│                      AUTHENTICATED REQUEST FLOW                              │
└─────────────────────────────────────────────────────────────────────────────┘

[Frontend]                [API Gateway]           [Auth Service]         [Redis]
    │                           │                        │                   │
    │ POST /graphql            │                        │                   │
    │ Header: Authorization    │                        │                   │
    │ Bearer <access_token>    │                        │                   │
    ├──────────────────────────>│                        │                   │
    │                           │                        │                   │
    │                           │ Extract JWT from       │                   │
    │                           │ Authorization header   │                   │
    │                           │                        │                   │
    │                           │ Check if blacklisted   │                   │
    │                           ├───────────────────────────────────────────>│
    │                           │<───────────────────────────────────────────┤
    │                           │ (not blacklisted)      │                   │
    │                           │                        │                   │
    │                           │ gRPC ValidateToken()   │                   │
    │                           ├───────────────────────>│                   │
    │                           │                        │                   │
    │                           │                        │ Parse JWT         │
    │                           │                        │ Verify signature  │
    │                           │                        │ Check expiry      │
    │                           │                        │ Extract user_id   │
    │                           │                        │                   │
    │                           │<───────────────────────┤                   │
    │                           │ { valid: true,         │                   │
    │                           │   userId: "..." }      │                   │
    │                           │                        │                   │
    │                           │ Process request with   │                   │
    │                           │ authenticated user     │                   │
    │                           │                        │                   │
    │<──────────────────────────┤                        │                   │
    │ Response data            │                        │                   │
    │                           │                        │                   │


┌─────────────────────────────────────────────────────────────────────────────┐
│                         LOGOUT FLOW (TO BE IMPLEMENTED)                      │
└─────────────────────────────────────────────────────────────────────────────┘

[Frontend]                [API Gateway]           [Auth Service]         [Redis]
    │                           │                        │                   │
    │ POST /graphql            │                        │                   │
    │ mutation { logout }      │                        │                   │
    ├──────────────────────────>│                        │                   │
    │                           │                        │                   │
    │                           │ gRPC Logout()          │                   │
    │                           ├───────────────────────>│                   │
    │                           │                        │                   │
    │                           │                        │ Add access_token  │
    │                           │                        │ to blacklist      │
    │                           │                        ├──────────────────>│
    │                           │                        │                   │
    │                           │                        │ Add refresh_token │
    │                           │                        │ to blacklist      │
    │                           │                        ├──────────────────>│
    │                           │                        │                   │
    │                           │                        │ Publish NATS      │
    │                           │                        │ "auth.user.logout"│
    │                           │                        │                   │
    │                           │<───────────────────────┤                   │
    │<──────────────────────────┤                        │                   │
    │ { success: true }        │                        │                   │
    │                           │                        │                   │
    │ Clear tokens from        │                        │                   │
    │ localStorage/cookies     │                        │                   │
    │                           │                        │                   │


┌─────────────────────────────────────────────────────────────────────────────┐
│                  FORGOT PASSWORD FLOW (TO BE IMPLEMENTED)                    │
└─────────────────────────────────────────────────────────────────────────────┘

[Frontend]            [API Gateway]      [Auth Service]    [MongoDB]    [Email Service]
    │                       │                   │               │               │
    │ POST /graphql        │                   │               │               │
    │ mutation             │                   │               │               │
    │ { forgotPassword }   │                   │               │               │
    ├─────────────────────>│                   │               │               │
    │                       │                   │               │               │
    │                       │ gRPC              │               │               │
    │                       │ ForgotPassword()  │               │               │
    │                       ├──────────────────>│               │               │
    │                       │                   │               │               │
    │                       │                   │ Find user     │               │
    │                       │                   ├──────────────>│               │
    │                       │                   │<──────────────┤               │
    │                       │                   │               │               │
    │                       │                   │ Generate      │               │
    │                       │                   │ reset token   │               │
    │                       │                   │ (UUID, 1hr)   │               │
    │                       │                   │               │               │
    │                       │                   │ Save token    │               │
    │                       │                   ├──────────────>│               │
    │                       │                   │               │               │
    │                       │                   │ Publish NATS  │               │
    │                       │                   │ "email.send"  ├──────────────>│
    │                       │                   │               │               │
    │                       │                   │               │  Send email   │
    │                       │                   │               │  with token   │
    │                       │                   │               │               │
    │                       │<──────────────────┤               │               │
    │<─────────────────────┤                   │               │               │
    │ { success: true }    │                   │               │               │
    │                       │                   │               │               │


┌─────────────────────────────────────────────────────────────────────────────┐
│                 RESET PASSWORD FLOW (TO BE IMPLEMENTED)                      │
└─────────────────────────────────────────────────────────────────────────────┘

[Frontend]                [API Gateway]           [Auth Service]         [MongoDB]
    │                           │                        │                   │
    │ POST /graphql            │                        │                   │
    │ mutation                 │                        │                   │
    │ { resetPassword }        │                        │                   │
    ├──────────────────────────>│                        │                   │
    │                           │                        │                   │
    │                           │ gRPC ResetPassword()   │                   │
    │                           ├───────────────────────>│                   │
    │                           │                        │                   │
    │                           │                        │ Find user by      │
    │                           │                        │ reset_token       │
    │                           │                        ├──────────────────>│
    │                           │                        │<──────────────────┤
    │                           │                        │                   │
    │                           │                        │ Check token       │
    │                           │                        │ expiry            │
    │                           │                        │                   │
    │                           │                        │ Hash new password │
    │                           │                        │                   │
    │                           │                        │ Update password   │
    │                           │                        │ Clear reset_token │
    │                           │                        ├──────────────────>│
    │                           │                        │                   │
    │                           │<───────────────────────┤                   │
    │<──────────────────────────┤                        │                   │
    │ { success: true }        │                        │                   │
    │                           │                        │                   │
    │ Redirect to login        │                        │                   │
    │                           │                        │                   │


┌─────────────────────────────────────────────────────────────────────────────┐
│                 TOKEN REFRESH FLOW (TO BE IMPLEMENTED)                       │
└─────────────────────────────────────────────────────────────────────────────┘

[Frontend]                [API Gateway]           [Auth Service]         [MongoDB]
    │                           │                        │                   │
    │ Access token expired     │                        │                   │
    │                           │                        │                   │
    │ POST /graphql            │                        │                   │
    │ mutation                 │                        │                   │
    │ { refreshToken }         │                        │                   │
    ├──────────────────────────>│                        │                   │
    │                           │                        │                   │
    │                           │ gRPC RefreshToken()    │                   │
    │                           ├───────────────────────>│                   │
    │                           │                        │                   │
    │                           │                        │ Validate refresh  │
    │                           │                        │ token             │
    │                           │                        ├──────────────────>│
    │                           │                        │<──────────────────┤
    │                           │                        │                   │
    │                           │                        │ Check if revoked  │
    │                           │                        │ or expired        │
    │                           │                        │                   │
    │                           │                        │ Generate new      │
    │                           │                        │ access token      │
    │                           │                        │                   │
    │                           │                        │ Rotate refresh    │
    │                           │                        │ token (optional)  │
    │                           │                        │                   │
    │                           │<───────────────────────┤                   │
    │<──────────────────────────┤                        │                   │
    │ { accessToken,           │                        │                   │
    │   refreshToken }         │                        │                   │
    │                           │                        │                   │
    │ Store new tokens         │                        │                   │
    │                           │                        │                   │
```

---

## 3. Token Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            JWT TOKEN STRUCTURE                               │
└─────────────────────────────────────────────────────────────────────────────┘

ACCESS TOKEN (Short-lived: 15-30 minutes)
┌───────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
│ {                                                              │
│   "alg": "HS256",                                             │
│   "typ": "JWT"                                                │
│ }                                                              │
├───────────────────────────────────────────────────────────────┤
│ PAYLOAD                                                        │
│ {                                                              │
│   "user_id": "507f1f77bcf86cd799439011",                     │
│   "email": "user@example.com",                               │
│   "role": "user",                                            │
│   "exp": 1729612800,      // Expiration (15-30 min)         │
│   "iat": 1729611000,      // Issued at                      │
│   "jti": "unique-token-id" // Token ID for blacklisting     │
│ }                                                              │
├───────────────────────────────────────────────────────────────┤
│ SIGNATURE                                                      │
│ HMACSHA256(                                                    │
│   base64UrlEncode(header) + "." +                            │
│   base64UrlEncode(payload),                                  │
│   secret                                                       │
│ )                                                              │
└───────────────────────────────────────────────────────────────┘


REFRESH TOKEN (Long-lived: 7-30 days)
┌───────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
│ {                                                              │
│   "alg": "HS256",                                             │
│   "typ": "JWT"                                                │
│ }                                                              │
├───────────────────────────────────────────────────────────────┤
│ PAYLOAD                                                        │
│ {                                                              │
│   "user_id": "507f1f77bcf86cd799439011",                     │
│   "token_type": "refresh",                                    │
│   "exp": 1732291200,      // Expiration (7-30 days)         │
│   "iat": 1729611000,      // Issued at                      │
│   "jti": "unique-refresh-id"                                 │
│ }                                                              │
├───────────────────────────────────────────────────────────────┤
│ SIGNATURE                                                      │
│ HMACSHA256(...)                                               │
└───────────────────────────────────────────────────────────────┘


STORAGE LOCATIONS
┌───────────────────────────────────────────────────────────────┐
│ Access Token:  • localStorage (web)                           │
│                • Memory state (React context)                 │
│                • Secure storage (mobile)                      │
│                                                                │
│ Refresh Token: • HttpOnly Cookie (recommended)               │
│                • Secure storage (mobile)                      │
│                • Encrypted localStorage (fallback)            │
└───────────────────────────────────────────────────────────────┘


TOKEN BLACKLIST (Redis)
┌───────────────────────────────────────────────────────────────┐
│ Key: blacklist:access_token:{jti}                             │
│ Value: 1                                                       │
│ TTL: Token expiration time                                    │
│                                                                │
│ Key: blacklist:refresh_token:{jti}                            │
│ Value: 1                                                       │
│ TTL: Token expiration time                                    │
└───────────────────────────────────────────────────────────────┘
```

---

## 4. Database Schema Visual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MONGODB COLLECTIONS                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                     USERS COLLECTION                          │
├──────────────────────────────────────────────────────────────┤
│ _id                    : ObjectId                             │
│ email                  : String (unique, indexed)             │
│ password_hash          : String (bcrypt)                      │
│ name                   : String                               │
│ role                   : String (user, admin, moderator)      │
│                                                                │
│ ┌──── Email Verification ────┐                               │
│ │ email_verified       : Boolean                             │
│ │ verification_token   : String (indexed)                    │
│ │ verification_expires : Date                                │
│ └────────────────────────────┘                               │
│                                                                │
│ ┌──── Password Reset ────────┐                               │
│ │ reset_token          : String (indexed)                    │
│ │ reset_token_expires  : Date                                │
│ └────────────────────────────┘                               │
│                                                                │
│ ┌──── Security ──────────────┐                               │
│ │ failed_login_attempts: Number                              │
│ │ locked_until         : Date                                │
│ │ last_login           : Date                                │
│ └────────────────────────────┘                               │
│                                                                │
│ created_at             : Date (indexed)                       │
│ updated_at             : Date                                 │
└──────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│               REFRESH_TOKENS COLLECTION                       │
├──────────────────────────────────────────────────────────────┤
│ _id              : ObjectId                                   │
│ user_id          : ObjectId (ref: users, indexed)            │
│ token_hash       : String (hashed, unique, indexed)          │
│ expires_at       : Date (TTL indexed)                        │
│ created_at       : Date                                       │
│ revoked          : Boolean                                    │
│ revoked_at       : Date                                       │
│ device_info      : Object                                     │
│   ├─ user_agent  : String                                    │
│   ├─ ip_address  : String                                    │
│   └─ device_name : String                                    │
└──────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│                  TEAMS COLLECTION (User Service)              │
├──────────────────────────────────────────────────────────────┤
│ _id              : ObjectId                                   │
│ name             : String                                     │
│ description      : String                                     │
│ owner_id         : ObjectId (ref: users)                     │
│ member_ids       : Array[ObjectId] (ref: users)              │
│ created_at       : Date                                       │
│ updated_at       : Date                                       │
└──────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│                 CONTENT COLLECTION (Content Service)          │
├──────────────────────────────────────────────────────────────┤
│ _id              : ObjectId                                   │
│ user_id          : ObjectId (ref: users)                     │
│ title            : String                                     │
│ body             : String                                     │
│ media_urls       : Array[String]                             │
│ tags             : Array[String]                             │
│ status           : String (draft, pending, approved, pub)    │
│ platforms        : Array[String]                             │
│ created_at       : Date                                       │
│ updated_at       : Date                                       │
└──────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                            REDIS KEYS                                        │
└─────────────────────────────────────────────────────────────────────────────┘

TOKEN BLACKLIST
├─ blacklist:access_token:{jti}     → "1" (TTL: token expiry)
└─ blacklist:refresh_token:{jti}    → "1" (TTL: token expiry)

RATE LIMITING
├─ rate_limit:login:{ip}            → count (TTL: 15 min)
├─ rate_limit:register:{ip}         → count (TTL: 1 hour)
├─ rate_limit:forgot_password:{ip}  → count (TTL: 1 hour)
└─ rate_limit:api:{user_id}         → count (TTL: 1 min)

SESSION TRACKING
└─ session:{user_id}:{device_id}    → session_data (TTL: 30 days)

ACCOUNT LOCKOUT
└─ lockout:{user_id}                → lockout_time (TTL: 30 min)

PASSWORD RESET CACHE
└─ password_reset:{token}           → user_id (TTL: 1 hour)
```

---

## 5. Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ERROR HANDLING ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────────────┘

[Service Layer]
      │
      │ Error occurs
      │
      ▼
┌─────────────────────┐
│  Log Error          │
│  (zerolog)          │
│  • Level: error     │
│  • Context: service │
│  • Stack trace      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Map to gRPC Error  │
│                     │
│  • InvalidArgument  │
│  • Unauthenticated  │
│  • PermissionDenied │
│  • NotFound         │
│  • AlreadyExists    │
│  • Internal         │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Return gRPC Status │
│  with error details │
└──────┬──────────────┘
       │
       ▼
[API Gateway]
       │
       ▼
┌─────────────────────┐
│  Map to GraphQL     │
│  Error              │
│                     │
│  • Message          │
│  • Code             │
│  • Path             │
│  • Extensions       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Return JSON        │
│  Response           │
│                     │
│  {                  │
│    "errors": [...], │
│    "data": null     │
│  }                  │
└──────┬──────────────┘
       │
       ▼
[Frontend]
       │
       ▼
┌─────────────────────┐
│  Display User-      │
│  Friendly Error     │
│                     │
│  • Toast/Alert      │
│  • Form validation  │
│  • Error page       │
└─────────────────────┘


COMMON ERROR CODES:
├─ AUTH_001: Invalid credentials
├─ AUTH_002: Token expired
├─ AUTH_003: Token invalid
├─ AUTH_004: User already exists
├─ AUTH_005: User not found
├─ AUTH_006: Account locked
├─ AUTH_007: Email not verified
├─ AUTH_008: Reset token invalid/expired
├─ AUTH_009: Password too weak
└─ AUTH_010: Rate limit exceeded
```

---

**Diagram Version:** 1.0
**Last Updated:** October 22, 2025
**Status:** Architecture Planning Phase
