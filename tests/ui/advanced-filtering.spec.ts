// spec: specs/quickpizza-ui.plan.md
// seed: tests/ui/seed.spec.ts

import { test, expect } from '@playwright/test';
import { QuickPizzaHomepage } from '../../interface/ui/homepage';

test.describe('Advanced Pizza Filtering', () => {
    let pizzaPage: QuickPizzaHomepage;

    test.beforeEach(async ({ page }) => {
        pizzaPage = new QuickPizzaHomepage(page);
    });

    test('Enable Advanced Options', async () => {
        await test.step('Navigate to QuickPizza homepage', async () => {
            await pizzaPage.navigate();
        });

        await test.step('Click on the Advanced toggle', async () => {
            await pizzaPage.enableAdvancedOptions();
        });

        await test.step('Verify advanced options are displayed', async () => {
            await expect(await pizzaPage.getCaloriesInput()).toBeVisible();
            await expect(await pizzaPage.getMinToppingsInput()).toBeVisible();
            await expect(await pizzaPage.getMaxToppingsInput()).toBeVisible();
        });

        await test.step('Verify Excluded tools listbox', async () => {
            await expect(await pizzaPage.getExcludedToolsListbox()).toBeVisible();
        });

        await test.step('Verify Must be vegetarian checkbox', async () => {
            await expect(await pizzaPage.getVegetarianCheckbox()).toBeVisible();
        });

        await test.step('Verify Custom Pizza Name textbox', async () => {
            await expect(await pizzaPage.getCustomPizzaNameInput()).toBeVisible();
        });
    });

    test('Customize Pizza with Advanced Options', async ({ page }) => {
        await test.step('Navigate to QuickPizza homepage', async () => {
            await pizzaPage.navigate();
        });

        await test.step('Enable Advanced toggle', async () => {
            await pizzaPage.enableAdvancedOptions();
        });

        await test.step('Set Max Calories to 300', async () => {
            const maxCaloriesInput = await pizzaPage.getCaloriesInput();
            await maxCaloriesInput.clear();
            await maxCaloriesInput.fill('300');
        });

        await test.step('Set Min Toppings to 3', async () => {
            const minToppingsInput = await pizzaPage.getMinToppingsInput();
            await minToppingsInput.clear();
            await minToppingsInput.fill('3');
        });

        await test.step('Set Max Toppings to 4', async () => {
            const maxToppingsInput = await pizzaPage.getMaxToppingsInput();
            await maxToppingsInput.clear();
            await maxToppingsInput.fill('4');
        });

        await test.step('Check Must be vegetarian checkbox', async () => {
            await (await pizzaPage.getVegetarianCheckbox()).check();
        });

        await test.step('Enter My Custom Pizza in Custom Pizza Name field', async () => {
            await (await pizzaPage.getCustomPizzaNameInput()).fill('My Custom Pizza');
        });

        await test.step('Click Pizza, Please! button', async () => {
            await pizzaPage.clickPizzaButton();
        });

        await test.step('Verify pizza recommendation is generated', async () => {
            await expect(await pizzaPage.getRecommendationHeading()).toBeVisible();
        });
    });
});
