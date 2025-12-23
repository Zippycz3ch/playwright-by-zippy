// spec: specs/quickpizza-ui.plan.md
// seed: tests/api/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

test.describe('Navigation and Footer', () => {
    test('Verify Footer Links', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await page.goto(BASE_URL);

        // 2. Verify footer elements are present

        // Verify "Made with ❤️ by QuickPizza Labs" text
        await expect(page.getByText(/Made with ❤️ by QuickPizza Labs/)).toBeVisible();

        // Verify WebSocket visitor ID is displayed
        await expect(page.getByText(/WebSocket visitor ID:/)).toBeVisible();

        // Verify "Click here" admin link
        await expect(page.getByRole('link', { name: 'Click here' })).toBeVisible();

        // Verify GitHub link
        await expect(page.getByRole('link', { name: 'GitHub' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/grafana/quickpizza');
    });

    test('Navigate to Admin Page', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await page.goto(BASE_URL);

        // 2. Click on "Click here" admin link in footer
        await page.getByRole('link', { name: 'Click here' }).click();

        // 3. Verify navigation to admin page
        await expect(page).toHaveURL(/\/admin/);

        // Wait for page to load
        await page.waitForLoadState('networkidle');
    });

    test('Verify Back to Main Page Navigation', async ({ page }) => {
        // Navigate to login page
        await page.goto(`${BASE_URL}/login`);

        // Click on "Back to main page" link
        await page.getByRole('link', { name: 'Back to main page' }).click();

        // Verify navigation to homepage
        await expect(page).toHaveURL(BASE_URL + '/');
        await expect(page.getByRole('heading', { name: 'Looking to break out of your pizza routine?' })).toBeVisible();
    });
});
