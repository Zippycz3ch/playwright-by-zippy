// spec: specs/quickpizza-ui.plan.md
// seed: tests/api/seed.spec.ts

import { test, expect } from '@playwright/test';
import { QuickPizzaHomepage } from '../../interface/ui/homepage';

test.describe('Advanced Pizza Filtering', () => {
    let pizzaPage: QuickPizzaHomepage;

    test.beforeEach(async ({ page }) => {
        pizzaPage = new QuickPizzaHomepage(page);
    });

    test('Enable Advanced Options', async () => {
        // 1. Navigate to QuickPizza homepage
        await pizzaPage.navigate();

        // 2. Click on the Advanced toggle
        await pizzaPage.enableAdvancedOptions();

        // 3. Verify advanced options are displayed
        await expect(await pizzaPage.getCaloriesInput()).toBeVisible();

        // Verify Min Number of Toppings input
        await expect(await pizzaPage.getMinToppingsInput()).toBeVisible();
        await expect(await pizzaPage.getMaxToppingsInput()).toBeVisible();

        // Verify Excluded tools listbox
        await expect(await pizzaPage.getExcludedToolsListbox()).toBeVisible();

        // Verify "Must be vegetarian" checkbox
        await expect(await pizzaPage.getVegetarianCheckbox()).toBeVisible();

        // Verify Custom Pizza Name textbox
        await expect(await pizzaPage.getCustomPizzaNameInput()).toBeVisible();
    });

    test('Customize Pizza with Advanced Options', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await pizzaPage.navigate();

        // 2. Enable Advanced toggle
        await pizzaPage.enableAdvancedOptions();

        // 3. Set Max Calories to 300
        const maxCaloriesInput = await pizzaPage.getCaloriesInput();
        await maxCaloriesInput.clear();
        await maxCaloriesInput.fill('300');

        // 4. Set Min Toppings to 3
        const minToppingsInput = await pizzaPage.getMinToppingsInput();
        await minToppingsInput.clear();
        await minToppingsInput.fill('3');

        // 5. Set Max Toppings to 4
        const maxToppingsInput = await pizzaPage.getMaxToppingsInput();
        await maxToppingsInput.clear();
        await maxToppingsInput.fill('4');

        // 6. Check "Must be vegetarian" checkbox
        await (await pizzaPage.getVegetarianCheckbox()).check();

        // 7. Enter "My Custom Pizza" in Custom Pizza Name field
        await (await pizzaPage.getCustomPizzaNameInput()).fill('My Custom Pizza');

        // 8. Click "Pizza, Please!" button
        await pizzaPage.clickPizzaButton();

        // Verify pizza recommendation is generated
        await expect(await pizzaPage.getRecommendationHeading()).toBeVisible();
    });
});
