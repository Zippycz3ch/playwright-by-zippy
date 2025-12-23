// spec: specs/quickpizza-ui.plan.md
// seed: tests/api/seed.spec.ts

import { test, expect } from '@playwright/test';
import { QuickPizzaHomepage } from '../../interface/ui/homepage';

test.describe('User Authentication', () => {
    let pizzaPage: QuickPizzaHomepage;

    test.beforeEach(async ({ page }) => {
        pizzaPage = new QuickPizzaHomepage(page);
    });

    test('Navigate to Login Page', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await pizzaPage.navigate();

        // 2. Click on "Login/Profile" link
        await (await pizzaPage.getLoginLink()).click();

        // 3. Verify login page is displayed
        await expect(page.getByRole('heading', { name: 'QuickPizza User Login' })).toBeVisible();

        // Verify Username field with hint
        await expect(await pizzaPage.getUsernameInput()).toBeVisible();

        // Verify Password field with hint
        await expect(await pizzaPage.getPasswordInput()).toBeVisible();

        // Verify "Sign in" button
        await expect(await pizzaPage.getSignInButton()).toBeVisible();
    });

    test('Login with Valid Credentials', async ({ page }) => {
        // 1. Navigate to login page
        await pizzaPage.navigateToLogin();

        // 2-4. Login with credentials
        await pizzaPage.login('default', '12345678');

        // Verify successful login (check if redirected or profile visible)
        await expect(page).not.toHaveURL(/\/login$/);
    });

    test('Save Favorite Pizza After Login', async ({ page }) => {
        // 1. Login with valid credentials
        await pizzaPage.navigateToLogin();
        await pizzaPage.login('default', '12345678');

        // 2. Navigate to homepage
        await pizzaPage.navigate();

        // 3. Click "Pizza, Please!" button
        await pizzaPage.clickPizzaButton();

        // Wait for recommendation to appear
        await expect(await pizzaPage.getRecommendationHeading()).toBeVisible();

        // 4. Click "Love it!" button
        await pizzaPage.clickLoveIt();

        // Verify success (no "Please log in first" message)
        await expect(page.getByText('Please log in first')).not.toBeVisible();
    });
});
