import { test, expect } from '@playwright/test';

// Helper to generate unique test user credentials
const generateTestUser = () => ({
  name: `Test User ${Date.now()}`,
  email: `test${Date.now()}@example.com`,
  password: 'TestPass123!',
});

// Helper to clear localStorage and remove Next.js dev overlay
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    // Remove Next.js dev overlay that blocks clicks
    const overlay = document.querySelector('nextjs-portal');
    if (overlay) {
      overlay.remove();
    }
  });

  // Wait a bit for any overlays to be removed
  await page.waitForTimeout(100);
});

test.describe('Authentication Flow', () => {
  test.describe('Registration', () => {
    test('should display registration form correctly', async ({ page }) => {
      await page.goto('/signup');

      // Check page loaded
      await expect(page).toHaveTitle(/ConQ/i);

      // Check form elements exist
      await expect(page.locator('input[name="name"], input#name')).toBeVisible();
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]').first()).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();

      // Check heading
      await expect(page.locator('h1')).toContainText(/create account|sign up|register/i);
    });

    test('should show validation errors for empty form', async ({ page }) => {
      await page.goto('/signup');

      // Click submit without filling form
      await page.locator('button[type="submit"]').click();

      // Wait for validation errors
      await page.waitForTimeout(500);

      // Check for error messages
      const errorText = await page.textContent('body');
      expect(errorText).toMatch(/required|must be|cannot be empty/i);
    });

    test('should show validation error for invalid email', async ({ page }) => {
      await page.goto('/signup');

      const testUser = generateTestUser();

      // Fill form with invalid email
      await page.fill('input[name="name"], input#name', testUser.name);
      await page.fill('input[type="email"]', 'invalid-email');
      await page.fill('input[type="password"]', testUser.password);

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      // Check for email validation error
      const errorText = await page.textContent('body');
      expect(errorText).toMatch(/valid email|email.*invalid/i);
    });

    test('should show validation error for weak password', async ({ page }) => {
      await page.goto('/signup');

      const testUser = generateTestUser();

      // Fill form with weak password
      await page.fill('input[name="name"], input#name', testUser.name);
      await page.fill('input[type="email"]', testUser.email);

      const passwords = page.locator('input[type="password"]');
      await passwords.first().fill('weak');

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      // Check for password validation error
      const errorText = await page.textContent('body');
      expect(errorText).toMatch(/password.*8.*characters|password.*uppercase|password.*lowercase|password.*number/i);
    });

    test('should show error when passwords do not match', async ({ page }) => {
      await page.goto('/signup');

      const testUser = generateTestUser();

      await page.fill('input[name="name"], input#name', testUser.name);
      await page.fill('input[type="email"]', testUser.email);

      const passwords = page.locator('input[type="password"]');
      await passwords.first().fill(testUser.password);
      await passwords.nth(1).fill('DifferentPass123!');

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      // Check for password match error
      const errorText = await page.textContent('body');
      expect(errorText).toMatch(/passwords.*not match|passwords.*must match/i);
    });

    test('should successfully register a new user', async ({ page }) => {
      await page.goto('/signup');

      const testUser = generateTestUser();

      // Fill registration form
      await page.fill('input[name="name"], input#name', testUser.name);
      await page.fill('input[type="email"]', testUser.email);

      const passwords = page.locator('input[type="password"]');
      await passwords.first().fill(testUser.password);
      await passwords.nth(1).fill(testUser.password);

      // Submit form
      await page.locator('button[type="submit"]').click();

      // Wait for navigation or success message
      await page.waitForTimeout(3000);

      // Check if redirected to dashboard or success state
      const currentUrl = page.url();
      const isSuccessful = currentUrl.includes('/dashboard') ||
                          currentUrl.includes('/success') ||
                          await page.locator('text=/success|welcome|registered/i').isVisible().catch(() => false);

      expect(isSuccessful).toBeTruthy();

      // Check tokens in localStorage
      const tokens = await page.evaluate(() => ({
        authToken: localStorage.getItem('conq_auth_token'),
        refreshToken: localStorage.getItem('conq_refresh_token'),
        userData: localStorage.getItem('conq_user_data'),
      }));

      if (currentUrl.includes('/dashboard')) {
        expect(tokens.authToken).toBeTruthy();
        expect(tokens.refreshToken).toBeTruthy();
        expect(tokens.userData).toBeTruthy();
      }
    });

    test('should show error when registering with existing email', async ({ page }) => {
      const testUser = generateTestUser();

      // First registration
      await page.goto('/signup');
      await page.fill('input[name="name"], input#name', testUser.name);
      await page.fill('input[type="email"]', testUser.email);

      let passwords = page.locator('input[type="password"]');
      await passwords.first().fill(testUser.password);
      await passwords.nth(1).fill(testUser.password);
      await page.locator('button[type="submit"]').click();

      await page.waitForTimeout(3000);

      // Clear localStorage and try registering again with same email
      await page.evaluate(() => localStorage.clear());

      await page.goto('/signup');
      await page.fill('input[name="name"], input#name', testUser.name);
      await page.fill('input[type="email"]', testUser.email);

      passwords = page.locator('input[type="password"]');
      await passwords.first().fill(testUser.password);
      await passwords.nth(1).fill(testUser.password);
      await page.locator('button[type="submit"]').click();

      await page.waitForTimeout(2000);

      // Check for duplicate error
      const errorText = await page.textContent('body');
      expect(errorText).toMatch(/already.*exists|already.*registered|email.*taken/i);
    });
  });

  test.describe('Login', () => {
    test('should display login form correctly', async ({ page }) => {
      await page.goto('/login');

      // Check page loaded
      await expect(page).toHaveTitle(/ConQ/i);

      // Check form elements
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();

      // Check heading
      await expect(page.locator('h1')).toContainText(/sign in|login|log in|welcome back/i);

      // Check for forgot password link
      await expect(page.locator('a[href*="forgot"]')).toBeVisible();
    });

    test('should show validation errors for empty credentials', async ({ page }) => {
      await page.goto('/login');

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      const errorText = await page.textContent('body');
      expect(errorText).toMatch(/required|must be|cannot be empty/i);
    });

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/login');

      await page.fill('input[type="email"]', 'nonexistent@example.com');
      await page.fill('input[type="password"]', 'WrongPassword123!');

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(2000);

      // Check for authentication error
      const errorText = await page.textContent('body');
      expect(errorText).toMatch(/invalid.*credentials|incorrect.*password|login.*failed/i);
    });

    test('should successfully login with valid credentials', async ({ page }) => {
      // First, register a user
      const testUser = generateTestUser();

      await page.goto('/signup');
      await page.fill('input[name="name"], input#name', testUser.name);
      await page.fill('input[type="email"]', testUser.email);

      const passwordsSignup = page.locator('input[type="password"]');
      await passwordsSignup.first().fill(testUser.password);
      await passwordsSignup.nth(1).fill(testUser.password);
      await page.locator('button[type="submit"]').click();

      await page.waitForTimeout(3000);

      // Logout or clear tokens
      await page.evaluate(() => localStorage.clear());

      // Now login with those credentials
      await page.goto('/login');
      await page.fill('input[type="email"]', testUser.email);
      await page.fill('input[type="password"]', testUser.password);

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(3000);

      // Check if redirected to dashboard
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/dashboard|home/i);

      // Check tokens in localStorage
      const tokens = await page.evaluate(() => ({
        authToken: localStorage.getItem('conq_auth_token'),
        refreshToken: localStorage.getItem('conq_refresh_token'),
        userData: localStorage.getItem('conq_user_data'),
      }));

      expect(tokens.authToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
      expect(tokens.userData).toBeTruthy();

      // Verify user data
      const userData = JSON.parse(tokens.userData!);
      expect(userData.email).toBe(testUser.email);
      expect(userData.name).toBe(testUser.name);
    });

    test('should navigate to signup from login page', async ({ page }) => {
      await page.goto('/login');

      // Click signup link
      await page.locator('a[href*="signup"], a[href*="register"]').click();

      await page.waitForTimeout(1000);

      // Should be on signup page
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/signup|register/i);
    });
  });

  test.describe('Logout', () => {
    test('should successfully logout and clear tokens', async ({ page }) => {
      // First, register and login
      const testUser = generateTestUser();

      await page.goto('/signup');
      await page.fill('input[name="name"], input#name', testUser.name);
      await page.fill('input[type="email"]', testUser.email);

      const passwords = page.locator('input[type="password"]');
      await passwords.first().fill(testUser.password);
      await passwords.nth(1).fill(testUser.password);
      await page.locator('button[type="submit"]').click();

      await page.waitForTimeout(3000);

      // Verify logged in
      const tokensBeforeLogout = await page.evaluate(() => ({
        authToken: localStorage.getItem('conq_auth_token'),
        refreshToken: localStorage.getItem('conq_refresh_token'),
      }));

      expect(tokensBeforeLogout.authToken).toBeTruthy();

      // Find and click logout button
      const logoutButton = page.locator('button:has-text("logout"), button:has-text("sign out"), a:has-text("logout"), a:has-text("sign out")').first();

      if (await logoutButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await logoutButton.click();
        await page.waitForTimeout(2000);

        // Check tokens cleared
        const tokensAfterLogout = await page.evaluate(() => ({
          authToken: localStorage.getItem('conq_auth_token'),
          refreshToken: localStorage.getItem('conq_refresh_token'),
          userData: localStorage.getItem('conq_user_data'),
        }));

        expect(tokensAfterLogout.authToken).toBeFalsy();
        expect(tokensAfterLogout.refreshToken).toBeFalsy();
        expect(tokensAfterLogout.userData).toBeFalsy();

        // Should redirect to home or login
        const currentUrl = page.url();
        expect(currentUrl).toMatch(/login|^\/$|^\/$/);
      }
    });
  });

  test.describe('Forgot Password', () => {
    test('should display forgot password form correctly', async ({ page }) => {
      await page.goto('/forgot-password');

      // Check page loaded
      await expect(page).toHaveTitle(/ConQ/i);

      // Check form elements
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();

      // Check heading
      await expect(page.locator('h1')).toContainText(/forgot.*password|reset.*password/i);
    });

    test('should show validation error for empty email', async ({ page }) => {
      await page.goto('/forgot-password');

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      const errorText = await page.textContent('body');
      expect(errorText).toMatch(/required|must be|cannot be empty/i);
    });

    test('should show validation error for invalid email', async ({ page }) => {
      await page.goto('/forgot-password');

      await page.fill('input[type="email"]', 'invalid-email');
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      const errorText = await page.textContent('body');
      expect(errorText).toMatch(/valid email|email.*invalid/i);
    });

    test('should show success message for valid email', async ({ page }) => {
      await page.goto('/forgot-password');

      await page.fill('input[type="email"]', 'test@example.com');
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(2000);

      // Check for success message
      const successText = await page.textContent('body');
      expect(successText).toMatch(/sent|check.*email|reset.*link/i);
    });

    test('should navigate back to login from forgot password', async ({ page }) => {
      await page.goto('/forgot-password');

      // Click back to login link
      const loginLink = page.locator('a[href*="login"]').first();
      await loginLink.click();

      await page.waitForTimeout(1000);

      // Should be on login page
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/login/i);
    });
  });

  test.describe('Protected Routes', () => {
    test('should redirect unauthenticated user from dashboard', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForTimeout(2000);

      // Should redirect to login or show login prompt
      const currentUrl = page.url();
      const bodyText = await page.textContent('body');

      const isProtected = currentUrl.includes('/login') ||
                         bodyText?.match(/sign in|login|authenticate/i);

      expect(isProtected).toBeTruthy();
    });

    test('should allow authenticated user to access dashboard', async ({ page }) => {
      // Register and login
      const testUser = generateTestUser();

      await page.goto('/signup');
      await page.fill('input[name="name"], input#name', testUser.name);
      await page.fill('input[type="email"]', testUser.email);

      const passwords = page.locator('input[type="password"]');
      await passwords.first().fill(testUser.password);
      await passwords.nth(1).fill(testUser.password);
      await page.locator('button[type="submit"]').click();

      await page.waitForTimeout(3000);

      // Navigate to dashboard
      await page.goto('/dashboard');
      await page.waitForTimeout(2000);

      // Should stay on dashboard
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/dashboard/i);
    });
  });
});
