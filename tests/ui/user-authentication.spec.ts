// spec: specs/quickpizza-ui.plan.md
// seed: tests/api/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

test.describe('User Authentication', () => {
    test('Navigate to Login Page', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await page.goto(BASE_URL);

        // 2. Click on "Login/Profile" link
        await page.getByRole('link', { name: 'Login/Profile' }).click();

        // 3. Verify login page is displayed
        await expect(page.getByRole('heading', { name: 'QuickPizza User Login' })).toBeVisible();

        // Verify Username field with hint
        await expect(page.getByRole('textbox', { name: /Username.*default/ })).toBeVisible();

        // Verify Password field with hint
        await expect(page.getByRole('textbox', { name: /Password.*12345678/ })).toBeVisible();

        // Verify "Sign in" button
        await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
    });

    test('Login with Valid Credentials', async ({ page }) => {
        // 1. Navigate to login page
        await page.goto(`${BASE_URL}/login`);

        // 2. Enter username "default"
        await page.getByRole('textbox', { name: /Username/ }).fill('default');

        // 3. Enter password "12345678"
        await page.getByRole('textbox', { name: /Password/ }).fill('12345678');

        // 4. Click "Sign in" button
        await page.getByRole('button', { name: 'Sign in' }).click();

        // Wait for navigation or response
        await page.waitForLoadState('networkidle');

        // Verify successful login (check if redirected or profile visible)
        // This will depend on the actual behavior of the app
        await expect(page).not.toHaveURL(/\/login$/);
    });

    test('Save Favorite Pizza After Login', async ({ page }) => {
        // 1. Login with valid credentials
        await page.goto(`${BASE_URL}/login`);
        await page.getByRole('textbox', { name: /Username/ }).fill('default');
        await page.getByRole('textbox', { name: /Password/ }).fill('12345678');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.waitForLoadState('networkidle');

        // 2. Navigate to homepage
        await page.goto(BASE_URL);

        // 3. Click "Pizza, Please!" button
        await page.getByRole('button', { name: 'Pizza, Please!' }).click();

        // Wait for recommendation to appear
        await expect(page.getByRole('heading', { name: 'Our recommendation:' })).toBeVisible();

        // 4. Click "Love it!" button
        await page.getByRole('button', { name: 'Love it!' }).click();

        // Verify success (no "Please log in first" message)
        await expect(page.getByText('Please log in first')).not.toBeVisible();
    });
});
