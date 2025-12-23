// spec: specs/quickpizza-ui.plan.md
// seed: tests/api/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

test.describe('Advanced Pizza Filtering', () => {
    test('Enable Advanced Options', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await page.goto(BASE_URL);

        // 2. Click on the Advanced toggle
        await page.getByText('Advanced').click();

        // 3. Verify advanced options are displayed
        const maxCaloriesInput = page.getByRole('spinbutton').filter({ hasText: /Max Calories/ }).or(page.locator('input[type="number"]').first());
        await expect(maxCaloriesInput).toBeVisible();

        // Verify Min Number of Toppings input
        const toppingsInputs = page.locator('input[type="number"]');
        await expect(toppingsInputs).toHaveCount(3);

        // Verify Excluded tools listbox
        await expect(page.getByRole('listbox')).toBeVisible();
        await expect(page.getByRole('option', { name: 'Knife' })).toBeVisible();
        await expect(page.getByRole('option', { name: 'Pizza cutter' })).toBeVisible();
        await expect(page.getByRole('option', { name: 'Scissors' })).toBeVisible();

        // Verify "Must be vegetarian" checkbox
        await expect(page.getByRole('checkbox', { name: 'Must be vegetarian' })).toBeVisible();

        // Verify Custom Pizza Name textbox
        await expect(page.getByRole('textbox', { name: /Custom Pizza Name/ })).toBeVisible();
    });

    test('Customize Pizza with Advanced Options', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await page.goto(BASE_URL);

        // 2. Enable Advanced toggle
        await page.getByText('Advanced').click();

        // 3. Set Max Calories to 300
        const maxCaloriesInput = page.locator('input[type="number"]').first();
        await maxCaloriesInput.clear();
        await maxCaloriesInput.fill('300');

        // 4. Set Min Toppings to 3
        const minToppingsInput = page.locator('input[type="number"]').nth(1);
        await minToppingsInput.clear();
        await minToppingsInput.fill('3');

        // 5. Set Max Toppings to 4
        const maxToppingsInput = page.locator('input[type="number"]').nth(2);
        await maxToppingsInput.clear();
        await maxToppingsInput.fill('4');

        // 6. Check "Must be vegetarian" checkbox
        await page.getByRole('checkbox', { name: 'Must be vegetarian' }).check();

        // 7. Enter "My Custom Pizza" in Custom Pizza Name field
        await page.getByRole('textbox', { name: /Custom Pizza Name/ }).fill('My Custom Pizza');

        // 8. Click "Pizza, Please!" button
        await page.getByRole('button', { name: 'Pizza, Please!' }).click();

        // Verify pizza recommendation is generated
        await expect(page.getByRole('heading', { name: 'Our recommendation:' })).toBeVisible();

        // Verify pizza contains required information (using nth(1) to avoid label match)
        await expect(page.getByText(/Name:/).nth(1)).toBeVisible();
        await expect(page.getByText(/Calories per slice:/)).toBeVisible();
    });
});
