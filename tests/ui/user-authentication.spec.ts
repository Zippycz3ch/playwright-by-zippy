// spec: specs/quickpizza-ui.plan.md
// seed: tests/ui/seed.spec.ts

import { test, expect } from '@playwright/test';
import { QuickPizzaHomepage } from '../../interface/ui/homepage';
import { QuickPizzaLoginPage } from '../../interface/ui/loginpage';

test.describe('User Authentication', () => {
    let pizzaPage: QuickPizzaHomepage;
    let loginPage: QuickPizzaLoginPage;

    test.beforeEach(async ({ page }) => {
        pizzaPage = new QuickPizzaHomepage(page);
        loginPage = new QuickPizzaLoginPage(page);
    });

    test('Navigate to Login Page', async () => {
        await test.step('Navigate to QuickPizza homepage', async () => {
            await pizzaPage.navigate();
        });

        await test.step('Click on Login/Profile link', async () => {
            await (await pizzaPage.getLoginLink()).click();
        });

        await test.step('Verify login page is displayed', async () => {
            await loginPage.verifyLoginPageDisplayed();
        });
    });

    test('Login with Valid Credentials', async ({ page }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });

        await test.step('Login with credentials', async () => {
            await loginPage.login('default', '12345678');
        });

        await test.step('Verify successful login', async () => {
            // After successful login, profile page shows ratings and Logout button
            await expect(page.getByText('Your Pizza Ratings:')).toBeVisible();
            await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
        });
    });

    test('Save Favorite Pizza After Login', async ({ page }) => {
        await test.step('Login with valid credentials', async () => {
            await loginPage.navigate();
            await loginPage.login('default', '12345678');
        });

        await test.step('Navigate to homepage', async () => {
            await pizzaPage.navigate();
        });

        await test.step('Click Pizza, Please! button', async () => {
            await pizzaPage.clickPizzaButton();
        });

        await test.step('Wait for recommendation to appear', async () => {
            await expect(await pizzaPage.getRecommendationHeading()).toBeVisible();
        });

        await test.step('Click Love it! button', async () => {
            await pizzaPage.clickLoveIt();
        });

        await test.step('Verify success message', async () => {
            await expect(page.getByText('Please log in first')).not.toBeVisible();
        });
    });
});
