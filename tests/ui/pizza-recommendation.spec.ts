// spec: specs/quickpizza-ui.plan.md
// seed: tests/api/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

test.describe('Pizza Recommendation Generation', () => {
    test('Generate Basic Pizza Recommendation', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await page.goto(BASE_URL);

        // 2. Click on the "Pizza, Please!" button
        await page.getByRole('button', { name: 'Pizza, Please!' }).click();

        // 3. Verify pizza recommendation is displayed
        await expect(page.getByRole('heading', { name: 'Our recommendation:' })).toBeVisible();

        // Verify all required fields are present
        await expect(page.getByText(/Name:/)).toBeVisible();
        await expect(page.getByText(/Dough:/)).toBeVisible();
        await expect(page.getByText(/Ingredients:/)).toBeVisible();
        await expect(page.getByText(/Tool:/)).toBeVisible();
        await expect(page.getByText(/Calories per slice:/)).toBeVisible();

        // Verify action buttons are visible
        await expect(page.getByRole('button', { name: 'No thanks' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Love it!' })).toBeVisible();
    });

    test('Generate Multiple Recommendations', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await page.goto(BASE_URL);

        // 2. Click "Pizza, Please!" button
        await page.getByRole('button', { name: 'Pizza, Please!' }).click();

        // Get the first pizza name
        const firstPizzaText = await page.getByText(/Name:/).textContent();

        // 3. Click "No thanks" button
        await page.getByRole('button', { name: 'No thanks' }).click();

        // Wait for new recommendation
        await page.waitForTimeout(500);

        // 4. Verify a new recommendation appears
        await page.getByRole('button', { name: 'Pizza, Please!' }).click();
        const secondPizzaText = await page.getByText(/Name:/).textContent();

        // Verify pizza details are still present
        await expect(page.getByRole('heading', { name: 'Our recommendation:' })).toBeVisible();
        await expect(page.getByText(/Dough:/)).toBeVisible();
        await expect(page.getByText(/Ingredients:/)).toBeVisible();
    });
});
