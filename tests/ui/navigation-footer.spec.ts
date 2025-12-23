// spec: specs/quickpizza-ui.plan.md
// seed: tests/api/seed.spec.ts

import { test, expect } from '@playwright/test';
import { QuickPizzaHomepage } from '../../interface/ui/homepage';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

test.describe('Navigation and Footer', () => {
    let pizzaPage: QuickPizzaHomepage;

    test.beforeEach(async ({ page }) => {
        pizzaPage = new QuickPizzaHomepage(page);
    });

    test('Verify Footer Links', async () => {
        // 1. Navigate to QuickPizza homepage
        await pizzaPage.navigate();

        // 2. Verify footer elements are present

        // Verify "Made with ❤️ by QuickPizza Labs" text
        await expect(await pizzaPage.getFooterText()).toBeVisible();

        // Verify WebSocket visitor ID is displayed
        await expect(await pizzaPage.getVisitorIdText()).toBeVisible();

        // Verify "Click here" admin link
        await expect(await pizzaPage.getAdminLink()).toBeVisible();

        // Verify GitHub link
        const githubLink = await pizzaPage.getGitHubLink();
        await expect(githubLink).toBeVisible();
        await expect(githubLink).toHaveAttribute('href', 'https://github.com/grafana/quickpizza');
    });

    test('Navigate to Admin Page', async ({ page }) => {
        // 1. Navigate to QuickPizza homepage
        await pizzaPage.navigate();

        // 2. Click on "Click here" admin link in footer
        await (await pizzaPage.getAdminLink()).click();

        // 3. Verify navigation to admin page
        await expect(page).toHaveURL(/\/admin/);

        // Wait for page to load
        await page.waitForLoadState('networkidle');
    });

    test('Verify Back to Main Page Navigation', async ({ page }) => {
        // Navigate to login page
        await pizzaPage.navigateToLogin();

        // Click on "Back to main page" link
        await page.getByRole('link', { name: 'Back to main page' }).click();

        // Verify navigation to homepage
        await expect(page).toHaveURL(BASE_URL + '/');
        await expect(page.getByRole('heading', { name: 'Looking to break out of your pizza routine?' })).toBeVisible();
    });
});
