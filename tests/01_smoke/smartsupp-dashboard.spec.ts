import { test } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginpage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';

test.describe('Smartsupp | Dashboard - Navigation', { tag: ['@smoke', '@dashboard'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginAndVerifyDashboard(page);
    });

    test('should load the dashboard after login', async ({ page }) => {
        await dashboardPage.verifyDashboardPageLoaded();
    });

    test('should navigate to settings section', async ({ page }) => {
        await dashboardPage.verifyDashboardPageLoaded();
        await dashboardPage.navigateToSection('settings');
        await dashboardPage.verifySectionPageLoaded('settings');
    });

    test('should navigate to customers section', async ({ page }) => {
        await dashboardPage.verifyDashboardPageLoaded();
        await dashboardPage.navigateToSection('customers');
        await dashboardPage.verifySectionPageLoaded('customers');
    });
});
