import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';

test.describe('Smartsupp Dashboard', { tag: ['@ui'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginAndVerifyDashboard(page);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('dashboard loads after login @UI', async ({ page }) => {
        await dashboardPage.verifyDashboardPageLoaded();
    });

    test('navigate to settings @UI', async ({ page }) => {
        await dashboardPage.verifyDashboardPageLoaded();
        await dashboardPage.navigateToSection('settings');
        await dashboardPage.verifySectionPageLoaded('settings');
    });

    test('navigate to customers @UI', async ({ page }) => {
        await dashboardPage.verifyDashboardPageLoaded();
        await dashboardPage.navigateToSection('customers');
        await dashboardPage.verifySectionPageLoaded('customers');
    });
});
