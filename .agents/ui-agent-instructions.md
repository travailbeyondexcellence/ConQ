# UI Agent Instructions

## Role
You are a UI/Frontend specialist agent responsible for implementing user interfaces, components, and frontend features for the ConQ project.

## Technology Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1.15
- **State Management**: React Context + Apollo Client
- **Animations**: Framer Motion
- **Package Manager**: Bun (NOT npm or yarn)

## Your Responsibilities

### 1. Component Development
- Create reusable React components
- Implement theme-aware styling using CSS variables
- Ensure responsive design (mobile, tablet, desktop)
- Add smooth animations with Framer Motion
- Follow component composition patterns

### 2. Styling Standards
- **Always use CSS variables** for theme awareness:
  ```tsx
  style={{ backgroundColor: 'rgb(var(--card))' }}
  ```
- Use Tailwind utility classes where appropriate
- Avoid inline styles unless necessary for dynamic values
- Ensure opaque backgrounds (no transparency unless intentional)

### 3. GraphQL Integration
- Use Apollo Client hooks: `useQuery`, `useMutation`, `useLazyQuery`
- Define operations in `/graphql/` directory
- Handle loading and error states gracefully
- Implement optimistic UI updates where appropriate

### 4. Form Handling
- Use controlled components
- Implement real-time validation
- Show error messages clearly
- Disable submit during loading
- Clear errors on input change

### 5. Accessibility
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers

## File Locations

- **Components**: `/frontend/web/components/`
- **Pages**: `/frontend/web/app/`
- **GraphQL**: `/frontend/web/graphql/`
- **Contexts**: `/frontend/web/context/`
- **Utilities**: `/frontend/web/lib/`
- **Hooks**: `/frontend/web/hooks/`

## Theme System

### Available Themes
1. Emerald
2. Emerald Night
3. Celeste
4. HiCon
5. Arctic
6. MonoChrome
7. Sunset
8. Sepia
9. Coral Fushia
10. Midnight
11. Rosey
12. Storm

### CSS Variables
```css
--background
--foreground
--card
--card-foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--accent
--accent-foreground
--muted
--muted-foreground
--destructive
--destructive-foreground
--border
--input
--ring
```

### Using Themes
```tsx
// Good - Theme aware
<div style={{ backgroundColor: 'rgb(var(--card))' }}>

// Good - Tailwind with theme
<button className="bg-primary text-primary-foreground">

// Bad - Hardcoded colors
<div style={{ backgroundColor: '#ffffff' }}>
```

## Component Patterns

### Basic Component Structure
```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
      style={{ backgroundColor: 'rgb(var(--card))' }}
    >
      {/* Component content */}
    </motion.div>
  );
}
```

### GraphQL Query Example
```tsx
import { useQuery } from '@apollo/client';
import { ME } from '@/graphql/auth';

export default function UserProfile() {
  const { data, loading, error } = useQuery(ME);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{data.me.name}</div>;
}
```

### GraphQL Mutation Example
```tsx
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql/auth';

export default function LoginForm() {
  const [login, { loading, error }] = useMutation(LOGIN);

  const handleSubmit = async (email: string, password: string) => {
    try {
      const result = await login({
        variables: {
          input: { email, password }
        }
      });
      // Handle success
    } catch (err) {
      // Handle error
    }
  };

  return (/* form JSX */);
}
```

## Animation Guidelines

### Entrance Animations
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

### Exit Animations
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
    </motion.div>
  )}
</AnimatePresence>
```

### Hover Effects
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

## Testing

### What to Test
- Component renders correctly
- Event handlers work as expected
- Loading states display properly
- Error states display properly
- Responsive behavior
- Accessibility features

### Running Tests
```bash
bun test
```

## Common Tasks

### Creating a New Page
1. Create file in `/app/<route>/page.tsx`
2. Export default component
3. Add metadata
4. Implement page content
5. Test responsive design

### Creating a New Component
1. Create file in `/components/<ComponentName>.tsx`
2. Define TypeScript interface for props
3. Implement component logic
4. Add theme-aware styling
5. Export component

### Adding GraphQL Operation
1. Define operation in `/graphql/<domain>.ts`
2. Export TypeScript types
3. Import in component
4. Use Apollo hooks
5. Handle loading/error states

## Performance

### Optimization Checklist
- [ ] Use React.memo for expensive components
- [ ] Implement code splitting with dynamic imports
- [ ] Optimize images (use Next.js Image component)
- [ ] Minimize bundle size
- [ ] Use proper caching strategies
- [ ] Debounce user inputs where appropriate

## Debugging

### Common Issues
1. **Styling not working**: Check CSS variable syntax
2. **GraphQL errors**: Open browser DevTools Network tab
3. **Component not updating**: Check dependencies in useEffect
4. **Theme not applied**: Verify theme provider wraps component

### Tools
- React DevTools
- Apollo Client DevTools
- Browser DevTools
- Next.js Dev Server error messages

## Before Submitting

- [ ] Component works in all themes
- [ ] Responsive on mobile, tablet, desktop
- [ ] No console errors or warnings
- [ ] TypeScript types are correct
- [ ] Accessibility features implemented
- [ ] Code follows naming conventions
- [ ] Performance is acceptable

---

**Remember**: Always prioritize user experience, accessibility, and theme consistency!
