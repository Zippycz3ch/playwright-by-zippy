import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';

test.describe('Smartsupp Login', { tag: ['@ui'] }, () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('successful login @UI', async ({ page }) => {
        await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
        await loginPage.verifyNavigatedToDashboard();
    });

    test('invalid credentials show error @UI', async ({ page }) => {
        await loginPage.attemptLoginWithInvalidCredentials('invalid@example.com', 'wrongpassword');
        await loginPage.verifyErrorMessageDisplayed();
    });
});

