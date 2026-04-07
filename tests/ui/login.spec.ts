import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';

test.describe('Smartsupp Login', { tag: ['@ui'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
    });

    test('successful login @UI', async ({ page }) => {
        await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
        await dashboardPage.verifyDashboardPageLoaded();
    });

    test('invalid credentials show error @UI', async ({ page }) => {
        await loginPage.login('invalid@example.com', 'wrongpassword', false);
        await loginPage.verifyErrorMessageDisplayed('Invalid email or password');
    });
});