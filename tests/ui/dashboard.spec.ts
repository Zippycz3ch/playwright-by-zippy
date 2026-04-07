import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';

test.describe('Smartsupp Dashboard', { tag: ['@ui'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginPage.navigate();
        await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
    });

    test('dashboard loads after login @UI', async ({ page }) => {
        await dashboardPage.verifyPageLoaded();
        await dashboardPage.verifyNavigationSidebar();
        await dashboardPage.verifyMainContent();
        await dashboardPage.verifyConnectionCards();
    });

    test('navigate to settings @UI', async ({ page }) => {
        await dashboardPage.navigateToSection('settings');
        await dashboardPage.verifyNavigatedToSection('settings');
    });

    test('navigate to customers @UI', async ({ page }) => {
        await dashboardPage.navigateToSection('customers');
        await dashboardPage.verifyNavigatedToSection('customers');
    });
});
