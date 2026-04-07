import { Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { CONFIG } from '../../config';

export class LoginPage {
    constructor(private page: Page) { }

    get usernameInput() {
        return this.page.locator('#username');
    }

    get passwordInput() {
        return this.page.locator('#password');
    }

    get signInButton() {
        return this.page.locator('#kc-login');
    }

    get smartsuppLogo() {
        return this.page.locator('.header__logo');
    }

    get errorMessage() {
        return this.page.locator('.alert.alert--error .message-text');
    }

    async navigate() {
        await allure.step('Navigate to Smartsupp login page', async () => {
            await this.page.goto(`https://${CONFIG.AUTH_SUBDOMAIN}.${CONFIG.DOMAIN}`);
            await this.page.waitForLoadState('networkidle');
            await expect(this.smartsuppLogo).toBeVisible();
            await expect(this.usernameInput).toBeVisible();
            await expect(this.passwordInput).toBeVisible();
            await expect(this.signInButton).toBeVisible();
        });
    }

    async login(username: string, password: string) {
        await allure.step(`Login as ${username}`, async () => {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.signInButton.click();
            await this.page.waitForURL('**/app/dashboard**', { timeout: 10000 });
        });
    }

    async verifyNavigatedToDashboard() {
        await allure.step('Verify URL redirected to dashboard after login', async () => {
            await expect(this.page).toHaveURL(/.*app\.smartsupp\.com\/app\/dashboard/);
        });
    }

    async attemptLoginWithInvalidCredentials(username: string, password: string) {
        await allure.step('Attempt login with invalid credentials', async () => {
            await allure.step('Fill username field with invalid email', async () => {
                await this.usernameInput.fill(username);
            });

            await allure.step('Fill password field with wrong password', async () => {
                await this.passwordInput.fill(password);
            });

            await allure.step('Click sign in button', async () => {
                await this.signInButton.click();
            });
        });
    }

    async verifyErrorMessageDisplayed() {
        await allure.step('Verify error message is displayed', async () => {
            await allure.step('Verify error message is visible', async () => {
                await expect(this.errorMessage).toBeVisible();
            });

            await allure.step('Verify error message text is "Invalid email or password"', async () => {
                await expect(this.errorMessage).toHaveText('Invalid email or password');
            });
        });
    }
}
