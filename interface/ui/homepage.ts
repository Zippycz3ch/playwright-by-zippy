import { Page, expect, Locator } from '@playwright/test';
import { getBaseURL } from '../../config';
import * as allure from 'allure-js-commons';

export class QuickPizzaHomepage {
    constructor(private page: Page) { }

    async navigate() {
        await allure.step('Navigate to homepage', async () => {
            await this.page.goto(getBaseURL());
            await this.page.waitForLoadState('networkidle');
        });
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
        await allure.step('Click "Pizza, Please!" button', async () => {
            await (await this.getPizzaButton()).click();
        });
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
        await allure.step('Click "No thanks" button', async () => {
            await (await this.getNoThanksButton()).click();
        });
    }

    async clickLoveIt() {
        await allure.step('Click "Love it!" button', async () => {
            await (await this.getLoveItButton()).click();
        });
    }

    // Advanced options
    async getAdvancedToggle() {
        return this.page.getByText('Advanced');
    }

    async enableAdvancedOptions() {
        await allure.step('Enable advanced options', async () => {
            await (await this.getAdvancedToggle()).click();
        });
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

    async verifyTitle() {
        await expect(this.page).toHaveTitle('QuickPizza');
    }

    async verifyHomepageLoaded() {
        await this.page.waitForLoadState('load');
        await expect(this.page.locator('body')).toBeVisible();

        // Verify header elements
        await expect(await this.getLogo()).toBeVisible();
        await expect(this.page.getByRole('paragraph').filter({ hasText: /^QuickPizza$/ })).toBeVisible();
        await expect(await this.getLoginLink()).toBeVisible();

        // Verify main content
        await expect(this.page.getByRole('heading', { name: 'Looking to break out of your pizza routine?' })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'QuickPizza has your back!' })).toBeVisible();
        await expect(await this.getPizzaButton()).toBeVisible();

        // Verify footer elements
        await expect(await this.getFooterText()).toBeVisible();
        await expect(await this.getVisitorIdText()).toBeVisible();
        await expect(await this.getAdminLink()).toBeVisible();
        await expect(await this.getGitHubLink()).toBeVisible();
    }

    async setMobileViewport() {
        await this.page.setViewportSize({ width: 375, height: 667 });
    }

    getPage(): Page {
        return this.page;
    }
}
