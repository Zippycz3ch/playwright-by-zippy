import { test } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginpage';
import { DashboardPage } from '../../interface/ui/dashboardPage';

test.describe('Smartsupp | Login - Authentication', { tag: ['@smoke', '@login'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
    });

    test('should log in successfully with valid credentials', async ({ page }) => {
        await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
        await dashboardPage.verifyDashboardPageLoaded();
    });

    test('should show an error message for invalid credentials', async ({ page }) => {
        await loginPage.login('invalid@example.com', 'wrongpassword', false);
        await loginPage.verifyErrorMessageDisplayed('Invalid email or password');
    });
});