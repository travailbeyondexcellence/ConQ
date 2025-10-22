# Route Access Control & Permissions

This document defines access control policies for routes in the ConQ application.

## Overview

ConQ implements role-based access control (RBAC) to restrict certain routes and features based on user roles. This ensures security and appropriate feature access for different user types.

---

## User Roles

### 1. **Super Admin**
- Highest level of access
- Can manage all users, roles, and system settings
- Access to all routes including admin and developer tools

### 2. **Admin**
- Organization/team level administration
- Can manage users within their organization
- Access to administrative features and developer tools
- Cannot modify super admin settings

### 3. **Developer**
- Special access for development and testing
- Access to developer tools and test routes
- Cannot access admin management features
- Primarily for internal development team

### 4. **Standard User**
- Regular application user
- Access to core application features
- No access to admin or developer tools
- Default role for new users

---

## Protected Routes

### `/test/*` - Developer Testing Routes

**Access Level**: Developer, Admin, Super Admin **ONLY**

**Purpose**: Internal development and testing tools

**Current Routes**:
- `/test/component-tree` - Component hierarchy visualization
- `/test/mermaid` - Mermaid diagram examples

**Implementation Status**:
- ⚠️ **Currently Accessible** - No route guards implemented yet
- 🔜 **Future**: Route middleware will enforce access control

**Planned Implementation**:
```typescript
// Middleware will check user role before allowing access
if (!['developer', 'admin', 'super_admin'].includes(user.role)) {
  redirect('/unauthorized');
}
```

**Security Notes**:
- Test routes may contain sensitive development information
- Should NOT be accessible in production by regular users
- May expose internal application structure
- Will be protected by authentication + role check

---

### `/admin/*` - Administrative Routes

**Access Level**: Admin, Super Admin **ONLY**

**Purpose**: Application and organization management

**Includes**:
- User management
- Team management
- System settings
- Analytics dashboard (admin view)

**Implementation**: To be implemented with role-based middleware

---

### `/dashboard/*` - User Dashboard

**Access Level**: Authenticated users (all roles)

**Purpose**: Main application interface

**Includes**:
- Content management
- Scheduling
- Analytics (user view)
- Profile settings

---

### Public Routes

**Access Level**: Anyone (unauthenticated + authenticated)

**Routes**:
- `/` - Landing page
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/pricing` - Pricing information
- `/about` - About page
- `/contact` - Contact page

---

## Implementation Plan

### Phase 1: Authentication (✅ Completed)
- [x] JWT-based authentication
- [x] Login/Register functionality
- [x] Token storage and management
- [x] Protected route detection

### Phase 2: Role-Based Access Control (🔜 Pending)
- [ ] Add `role` field to User model
- [ ] Implement role assignment on registration
- [ ] Create role middleware for Next.js
- [ ] Add role checks to GraphQL resolvers
- [ ] Protect `/test/*` routes
- [ ] Protect `/admin/*` routes

### Phase 3: Permission Granularity (🔮 Future)
- [ ] Fine-grained permissions system
- [ ] Permission-based feature flags
- [ ] Team-level permissions
- [ ] Custom role creation

---

## Middleware Implementation

### Next.js Route Middleware

**Location**: `frontend/web/middleware.ts`

**Example Implementation**:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEVELOPER_ROUTES = ['/test'];
const ADMIN_ROUTES = ['/admin'];

const DEVELOPER_ROLES = ['developer', 'admin', 'super_admin'];
const ADMIN_ROLES = ['admin', 'super_admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get user from token (simplified)
  const token = request.cookies.get('auth_token')?.value;
  const user = validateAndDecodeToken(token);

  // Check developer routes
  if (DEVELOPER_ROUTES.some(route => pathname.startsWith(route))) {
    if (!user || !DEVELOPER_ROLES.includes(user.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Check admin routes
  if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
    if (!user || !ADMIN_ROLES.includes(user.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/test/:path*', '/admin/:path*'],
};
```

---

## Backend Authorization

### GraphQL Resolver Protection

**Location**: `backend/api-gateway/resolvers/`

**Example**:

```go
func (r *queryResolver) DeveloperTools(ctx context.Context) (*DeveloperToolsResponse, error) {
    user := auth.GetUserFromContext(ctx)

    allowedRoles := []string{"developer", "admin", "super_admin"}
    if !contains(allowedRoles, user.Role) {
        return nil, errors.New("unauthorized: developer access required")
    }

    // Return developer tools data
    return &DeveloperToolsResponse{...}, nil
}
```

---

## Role Assignment

### Default Assignments

**On Registration**:
- New users → `"user"` role (standard)
- First user → `"super_admin"` role (system setup)

**Manual Assignment** (by Super Admin):
- Super Admin can assign `admin` or `developer` roles
- Admins can assign `developer` role within their org

### Database Schema

```javascript
// MongoDB User Schema
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "password_hash": "...",
  "role": "user" | "developer" | "admin" | "super_admin",
  "org_id": ObjectId("..."),
  "created_at": ISODate("..."),
  "updated_at": ISODate("...")
}
```

---

## Testing Access Control

### Manual Testing Checklist

- [ ] Regular user CANNOT access `/test` routes
- [ ] Regular user CANNOT access `/admin` routes
- [ ] Developer CAN access `/test` routes
- [ ] Developer CANNOT access `/admin` routes (unless also admin)
- [ ] Admin CAN access `/test` and `/admin` routes
- [ ] Super Admin CAN access ALL routes
- [ ] Unauthenticated users redirected to `/auth/login`

### Automated Tests

```typescript
describe('Route Access Control', () => {
  it('should block regular users from /test routes', async () => {
    const response = await fetch('/test/component-tree', {
      headers: { Authorization: `Bearer ${regularUserToken}` }
    });
    expect(response.status).toBe(403); // Forbidden
  });

  it('should allow developers to access /test routes', async () => {
    const response = await fetch('/test/component-tree', {
      headers: { Authorization: `Bearer ${developerToken}` }
    });
    expect(response.status).toBe(200);
  });
});
```

---

## Security Best Practices

1. **Defense in Depth**
   - Implement checks at multiple layers (frontend + backend)
   - Never rely solely on client-side checks
   - Always validate on the server

2. **Token Validation**
   - Verify JWT signatures
   - Check token expiration
   - Validate role claims in token

3. **Audit Logging**
   - Log access attempts to protected routes
   - Monitor for unauthorized access attempts
   - Track role changes

4. **Principle of Least Privilege**
   - Grant minimum necessary permissions
   - Regular audit of user roles
   - Automatic role expiration for temporary access

---

## Current Status

**Date**: October 23, 2025

**Status**: ⚠️ **Documentation Only**

**Active Routes**:
- `/test/component-tree` - ⚠️ Currently accessible to all (no protection)
- `/test/mermaid` - ⚠️ Currently accessible to all (no protection)

**Action Required**:
- Implement role-based middleware
- Add role field to user schema
- Protect test routes
- Add unauthorized page
- Write access control tests

**Timeline**:
- Phase 2 implementation: Next sprint
- Complete protection: 2-3 weeks

---

## Related Documentation

- [Authentication System](../Project_Updates/GRAPHQL_IMPLEMENTATION_COMPLETE.md)
- [Folder Structure](./1%20Folder%20Structure.md)
- [Conventions](./0%20Conventions.md)
- [Component Map](../Repo_Structure/component-map.json)

---

## Notes for Developers

- **DO NOT** commit sensitive data in test routes
- **DO NOT** expose production data in developer tools
- **ALWAYS** check user role in backend resolvers
- **REMEMBER** to update this document when adding new protected routes

---

**Last Updated**: October 23, 2025
**Maintained By**: Development Team
**Review Frequency**: Every sprint
