import { Page, expect, Locator } from '@playwright/test';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

export class QuickPizzaHomepage {
    constructor(private page: Page) { }

    async navigate() {
        await this.page.goto(BASE_URL);
    }

    async navigateToLogin() {
        await this.page.goto(`${BASE_URL}/login`);
    }

    async getLogo() {
        return this.page.getByRole('link', { name: 'logo' });
    }

    async getLoginLink() {
        return this.page.getByRole('link', { name: 'Login/Profile' });
    }

    async getPizzaButton() {
        return this.page.getByRole('button', { name: 'Pizza, Please!' });
    }

    async clickPizzaButton() {
        await (await this.getPizzaButton()).click();
    }

    async getRecommendationHeading() {
        return this.page.getByRole('heading', { name: 'Our recommendation:' });
    }

    async getNoThanksButton() {
        return this.page.getByRole('button', { name: 'No thanks' });
    }

    async getLoveItButton() {
        return this.page.getByRole('button', { name: 'Love it!' });
    }

    async clickNoThanks() {
        await (await this.getNoThanksButton()).click();
    }

    async clickLoveIt() {
        await (await this.getLoveItButton()).click();
    }

    // Advanced options
    async getAdvancedToggle() {
        return this.page.getByText('Advanced');
    }

    async enableAdvancedOptions() {
        await (await this.getAdvancedToggle()).click();
    }

    async getAdvancedCheckbox() {
        return this.page.getByRole('checkbox', { name: 'Advanced' });
    }

    async getVegetarianCheckbox() {
        return this.page.getByRole('checkbox', { name: 'Must be vegetarian' });
    }

    async getExcludedToolsListbox() {
        return this.page.getByRole('listbox');
    }

    async getCustomPizzaNameInput() {
        return this.page.getByRole('textbox', { name: /Custom Pizza Name/ });
    }

    async getCaloriesInput() {
        return this.page.locator('input[type="number"]').first();
    }

    async getMinToppingsInput() {
        return this.page.locator('input[type="number"]').nth(1);
    }

    async getMaxToppingsInput() {
        return this.page.locator('input[type="number"]').nth(2);
    }

    // Footer elements
    async getFooterText() {
        return this.page.getByText(/Made with ❤️ by QuickPizza Labs/);
    }

    async getVisitorIdText() {
        return this.page.getByText(/WebSocket visitor ID:/);
    }

    async getAdminLink() {
        return this.page.getByRole('link', { name: 'Click here' });
    }

    async getGitHubLink() {
        return this.page.getByRole('link', { name: 'GitHub' });
    }

    // Login page elements
    async getUsernameInput() {
        return this.page.getByRole('textbox', { name: /Username/ });
    }

    async getPasswordInput() {
        return this.page.getByRole('textbox', { name: /Password/ });
    }

    async getSignInButton() {
        return this.page.getByRole('button', { name: 'Sign in' });
    }

    async login(username: string, password: string) {
        await (await this.getUsernameInput()).fill(username);
        await (await this.getPasswordInput()).fill(password);
        await (await this.getSignInButton()).click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle('QuickPizza');
    }

    async verifyPageLoaded() {
        await this.page.waitForLoadState('load');
        await expect(this.page.locator('body')).toBeVisible();
    }

    async setMobileViewport() {
        await this.page.setViewportSize({ width: 375, height: 667 });
    }

    getPage(): Page {
        return this.page;
    }
}
