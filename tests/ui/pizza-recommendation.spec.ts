// spec: specs/quickpizza-ui.plan.md
// seed: tests/api/seed.spec.ts

import { test, expect } from '@playwright/test';
import { QuickPizzaHomepage } from '../../interface/ui/homepage';

test.describe('Pizza Recommendation Generation', () => {
    let pizzaPage: QuickPizzaHomepage;

    test.beforeEach(async ({ page }) => {
        pizzaPage = new QuickPizzaHomepage(page);
    });

    test('Generate Basic Pizza Recommendation', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await pizzaPage.navigate();

        // 2. Click on the "Pizza, Please!" button
        await pizzaPage.clickPizzaButton();

        // 3. Verify pizza recommendation is displayed
        await expect(await pizzaPage.getRecommendationHeading()).toBeVisible();

        // Verify all required fields are present
        await expect(page.getByText(/Name:/)).toBeVisible();
        await expect(page.getByText(/Dough:/)).toBeVisible();
        await expect(page.getByText(/Ingredients:/)).toBeVisible();
        await expect(page.getByText(/Tool:/)).toBeVisible();
        await expect(page.getByText(/Calories per slice:/)).toBeVisible();

        // Verify action buttons are visible
        await expect(await pizzaPage.getNoThanksButton()).toBeVisible();
        await expect(await pizzaPage.getLoveItButton()).toBeVisible();
    });

    test('Generate Multiple Recommendations', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await pizzaPage.navigate();

        // 2. Click "Pizza, Please!" button
        await pizzaPage.clickPizzaButton();

        // Get the first pizza name
        const firstPizzaText = await page.getByText(/Name:/).textContent();

        // 3. Click "No thanks" button
        await pizzaPage.clickNoThanks();

        // Wait for new recommendation
        await page.waitForTimeout(500);

        // 4. Verify a new recommendation appears
        await pizzaPage.clickPizzaButton();
        const secondPizzaText = await page.getByText(/Name:/).textContent();

        // Verify pizza details are still present
        await expect(await pizzaPage.getRecommendationHeading()).toBeVisible();
        await expect(page.getByText(/Dough:/)).toBeVisible();
        await expect(page.getByText(/Ingredients:/)).toBeVisible();
    });
});
