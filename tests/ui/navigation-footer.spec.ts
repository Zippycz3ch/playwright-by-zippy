// spec: specs/quickpizza-ui.plan.md
// seed: tests/ui/seed.spec.ts

import { test, expect } from '@playwright/test';
import { QuickPizzaHomepage } from '../../interface/ui/homepage';
import { QuickPizzaLoginPage } from '../../interface/ui/loginpage';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

test.describe('Navigation and Footer', () => {
    let pizzaPage: QuickPizzaHomepage;
    let loginPage: QuickPizzaLoginPage;

    test.beforeEach(async ({ page }) => {
        pizzaPage = new QuickPizzaHomepage(page);
        loginPage = new QuickPizzaLoginPage(page);
    });

    test('Verify Footer Links', async () => {
        await test.step('Navigate to QuickPizza homepage', async () => {
            await pizzaPage.navigate();
        });

        await test.step('Verify footer elements are present', async () => {
            await expect(await pizzaPage.getFooterText()).toBeVisible();
            await expect(await pizzaPage.getVisitorIdText()).toBeVisible();
            await expect(await pizzaPage.getAdminLink()).toBeVisible();
        });

        await test.step('Verify GitHub link', async () => {
            const githubLink = await pizzaPage.getGitHubLink();
            await expect(githubLink).toBeVisible();
            await expect(githubLink).toHaveAttribute('href', 'https://github.com/grafana/quickpizza');
        });
    });

    test('Navigate to Admin Page', async ({ page }) => {
        await test.step('Navigate to QuickPizza homepage', async () => {
            await pizzaPage.navigate();
        });

        await test.step('Click on Click here admin link in footer', async () => {
            await (await pizzaPage.getAdminLink()).click();
        });

        await test.step('Verify navigation to admin page', async () => {
            await expect(page).toHaveURL(/\/admin/);
            await page.waitForLoadState('networkidle');
        });
    });

    test('Verify Back to Main Page Navigation', async ({ page }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });

        await test.step('Click on Back to main page link', async () => {
            await (await loginPage.getBackToMainPageLink()).click();
        });

        await test.step('Verify navigation to homepage', async () => {
            await expect(page).toHaveURL(BASE_URL + '/');
            await expect(page.getByRole('heading', { name: 'Looking to break out of your pizza routine?' })).toBeVisible();
        });
    });
});
