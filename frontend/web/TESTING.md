# Testing Guide for ConQ Frontend

This guide explains how to write and run tests for the ConQ web application.

## Testing Stack

- **Testing Framework**: Vitest 4.0.1
- **Testing Library**: @testing-library/react
- **DOM Matchers**: @testing-library/jest-dom
- **Test Environment**: jsdom

## Running Tests

```bash
# Run tests in watch mode
bun run test

# Run tests once (CI mode)
bun run test:run

# Run tests with UI (interactive mode)
bun run test:ui
```

## Writing Tests

### Test File Location

Place test files next to the component they're testing with a `.test.tsx` extension:

```
components/
  ├── Logo.tsx
  └── Logo.test.tsx
```

### Basic Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button Component', () => {
  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Example Tests

### 1. Logo Component Test
Tests a simple SVG component with different props.

**File**: `components/Logo.test.tsx`

### 2. Button Component Test
Tests a button component with onClick handlers, variants, and disabled states.

**File**: `components/Button.test.tsx`

### 3. Card Component Test
Tests a card component with title, children, and custom className.

**File**: `components/Card.test.tsx`

## Configuration

### Vitest Config (`vitest.config.ts`)

- Uses jsdom environment for DOM testing
- Configured with React plugin for JSX support
- Path alias `@` points to project root
- Excludes Playwright tests directory (`tests/`)

### Setup File (`vitest.setup.ts`)

- Imports `@testing-library/jest-dom` for additional matchers
- Runs before each test file

## Common Matchers

```typescript
// Presence
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Text Content
expect(element).toHaveTextContent('Hello')

// Attributes
expect(element).toHaveAttribute('href', '/home')
expect(element).toHaveClass('btn-primary')

// Visibility
expect(element).toBeVisible()
expect(element).toBeDisabled()

// Form Elements
expect(input).toHaveValue('text')
expect(checkbox).toBeChecked()
```

## Best Practices

1. **Test User Behavior**: Test what users see and do, not implementation details
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Keep Tests Simple**: One test should test one thing
4. **Use describe blocks**: Group related tests together
5. **Mock External Dependencies**: Use `vi.fn()` for callbacks and external modules
6. **Clean Up**: Tests should be independent and not affect each other

## Testing Next.js Components

For components using Next.js features (like `useRouter`, `Link`), you may need to mock them:

```typescript
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
}));
```

## Continuous Integration

To run tests in CI:

```bash
bun run test:run
```

This runs tests once and exits (no watch mode).

## Coverage

To generate coverage reports (coming soon):

```bash
bun run test:coverage
```

## Troubleshooting

### Tests can't find `document`
- Check that `vitest.config.ts` has `environment: 'jsdom'`

### Import errors with `@` alias
- Ensure `vitest.config.ts` has correct path alias configuration

### Playwright conflicts
- Vitest is configured to exclude `tests/` directory where Playwright tests live

---

**Happy Testing! 🧪**
