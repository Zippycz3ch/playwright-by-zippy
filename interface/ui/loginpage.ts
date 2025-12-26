import { Page, expect } from '@playwright/test';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

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

    get backToMainPageLink() {
        return this.page.getByRole('link', { name: 'Back to main page' });
    }

    get helpText() {
        return this.page.getByText(/Tip: You can create a new user via the/);
    }

    // Actions
    async navigate() {
        await this.page.goto(`${BASE_URL}/login`);
        await this.page.waitForLoadState('networkidle');
    }

    async login(username: string, password: string) {
        await this.verifyLoginPageLoaded();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await this.page.waitForSelector('text=Your Pizza Ratings:', { timeout: 10000 });
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
        await expect(this.backToMainPageLink).toBeVisible();
    }

    getPage(): Page {
        return this.page;
    }
}
