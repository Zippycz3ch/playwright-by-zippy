// spec: specs/quickpizza-ui.plan.md
// seed: tests/ui/seed.spec.ts

import { test, expect } from '@playwright/test';
import { QuickPizzaHomepage } from '../../interface/ui/homepage';

test.describe('Pizza Recommendation Generation', () => {
    let pizzaPage: QuickPizzaHomepage;

    test.beforeEach(async ({ page }) => {
        pizzaPage = new QuickPizzaHomepage(page);
    });

    test('Generate Basic Pizza Recommendation', async ({ page }) => {
        await test.step('Navigate to QuickPizza homepage', async () => {
            await pizzaPage.navigate();
        });

        await test.step('Click on the Pizza, Please! button', async () => {
            await pizzaPage.clickPizzaButton();
        });

        await test.step('Verify pizza recommendation is displayed', async () => {
            await expect(await pizzaPage.getRecommendationHeading()).toBeVisible();
        });

        await test.step('Verify all required fields are present', async () => {
            await expect(page.getByText(/Name:/)).toBeVisible();
            await expect(page.getByText(/Dough:/)).toBeVisible();
            await expect(page.getByText(/Ingredients:/)).toBeVisible();
            await expect(page.getByText(/Tool:/)).toBeVisible();
            await expect(page.getByText(/Calories per slice:/)).toBeVisible();
        });

        await test.step('Verify action buttons are visible', async () => {
            await expect(await pizzaPage.getNoThanksButton()).toBeVisible();
            await expect(await pizzaPage.getLoveItButton()).toBeVisible();
        });
    });

    test('Generate Multiple Recommendations', async ({ page }) => {
        await test.step('Navigate to QuickPizza homepage', async () => {
            await pizzaPage.navigate();
        });

        await test.step('Click Pizza, Please! button', async () => {
            await pizzaPage.clickPizzaButton();
        });

        await test.step('Get the first pizza name', async () => {
            const firstPizzaText = await page.getByText(/Name:/).textContent();
        });

        await test.step('Click No thanks button', async () => {
            await pizzaPage.clickNoThanks();
            await page.waitForTimeout(500);
        });

        await test.step('Generate a new recommendation', async () => {
            await pizzaPage.clickPizzaButton();
            const secondPizzaText = await page.getByText(/Name:/).textContent();
        });

        await test.step('Verify pizza details are still present', async () => {
            await expect(await pizzaPage.getRecommendationHeading()).toBeVisible();
            await expect(page.getByText(/Dough:/)).toBeVisible();
            await expect(page.getByText(/Ingredients:/)).toBeVisible();
        });
    });
});
