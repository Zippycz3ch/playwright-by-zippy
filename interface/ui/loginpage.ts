import { Page, expect } from '@playwright/test';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

export class QuickPizzaLoginPage {
    constructor(private page: Page) { }

    async navigate() {
        await this.page.goto(`${BASE_URL}/login`);
        await this.page.waitForLoadState('networkidle');
    }

    async getUsernameInput() {
        return this.page.getByRole('textbox', { name: /Username/ });
    }

    async getPasswordInput() {
        return this.page.getByRole('textbox', { name: /Password/ });
    }

    async getSignInButton() {
        return this.page.getByRole('button', { name: 'Sign in' });
    }

    async getLoginHeading() {
        return this.page.getByRole('heading', { name: 'QuickPizza User Login' });
    }

    async getBackToMainPageLink() {
        return this.page.getByRole('link', { name: 'Back to main page' });
    }

    async login(username: string, password: string) {
        await this.verifyLoginPageLoaded();

        await this.page.getByRole('textbox', { name: /Username/ }).fill(username);
        await this.page.getByRole('textbox', { name: /Password/ }).fill(password);
        await this.page.getByRole('button', { name: 'Sign in' }).click();

        // Wait for profile content to appear after successful login
        await this.page.waitForSelector('text=Your Pizza Ratings:', { timeout: 10000 });
    }

    async verifyLoginPageDisplayed() {
        await expect(await this.getLoginHeading()).toBeVisible();
        await expect(await this.getUsernameInput()).toBeVisible();
        await expect(await this.getPasswordInput()).toBeVisible();
        await expect(await this.getSignInButton()).toBeVisible();
    }

    async verifyLoginPageLoaded() {
        await this.page.waitForLoadState('load');
        await expect(this.page.locator('body')).toBeVisible();

        // Verify main heading
        await expect(await this.getLoginHeading()).toBeVisible();

        // Verify form elements
        await expect(await this.getUsernameInput()).toBeVisible();
        await expect(await this.getPasswordInput()).toBeVisible();
        await expect(await this.getSignInButton()).toBeVisible();

        // Verify help text
        await expect(this.page.getByText(/Tip: You can create a new user via the/)).toBeVisible();

        // Verify footer
        await expect(await this.getBackToMainPageLink()).toBeVisible();
    }

    getPage(): Page {
        return this.page;
    }
}
