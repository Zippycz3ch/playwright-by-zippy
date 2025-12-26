import { Page, expect } from '@playwright/test';
import { getBaseURL } from '../../config';
import * as allure from 'allure-js-commons';

export class QuickPizzaLoginPage {
    constructor(private page: Page) { }

    // Locators
    get usernameInput() {
        return this.page.getByRole('textbox', { name: /Username/ });
    }

    get passwordInput() {
        return this.page.getByRole('textbox', { name: /Password/ });
    }

    get signInButton() {
        return this.page.getByRole('button', { name: 'Sign in' });
    }

    get loginHeading() {
        return this.page.getByRole('heading', { name: 'QuickPizza User Login' });
    }

    async getBackToMainPageLink() {
        return this.page.getByRole('link', { name: 'Back to main page' });
    }

    get helpText() {
        return this.page.getByText(/Tip: You can create a new user via the/);
    }

    // Actions
    async navigate() {
        await allure.step('Navigate to login page', async () => {
            await this.page.goto(`${getBaseURL()}/login`);
            await this.page.waitForLoadState('networkidle');
        });
    }

    async login(username: string, password: string) {
        await allure.step('Fill login form and submit', async () => {
            await this.verifyLoginPageLoaded();
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.signInButton.click();
        });

        await allure.step('Verify successful login', async () => {
            await expect(this.page.getByRole('heading', { name: 'Your Pizza Ratings:' })).toBeVisible({ timeout: 5000 });
            await expect(this.page.getByRole('button', { name: 'Clear Ratings' })).toBeVisible({ timeout: 5000 });
            await expect(this.page.getByRole('button', { name: 'Logout' })).toBeVisible({ timeout: 5000 });
            await expect(this.page.getByRole('link', { name: 'Back to main page' })).toBeVisible({ timeout: 5000 });
            await expect(this.page.getByRole('list')).toBeVisible({ timeout: 5000 });
        });
    }

    async loginWithInvalidCredentials(username: string, password: string) {
        await allure.step('Fill login form with invalid credentials and submit', async () => {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.signInButton.click();
        });

        await allure.step('Verify login failed', async () => {
            await expect(this.page.getByText('Login failed:')).toBeVisible({ timeout: 5000 });
            await expect(this.page.getByText('Unauthorized')).toBeVisible({ timeout: 5000 });
        });
    }

    // Verifications
    async verifyLoginPageLoaded() {
        await this.page.waitForLoadState('load');
        await expect(this.page.locator('body')).toBeVisible();
        await expect(this.loginHeading).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.signInButton).toBeVisible();
        await expect(this.helpText).toBeVisible();
        await expect(await this.getBackToMainPageLink()).toBeVisible();
    }

    getPage(): Page {
        return this.page;
    }
}
