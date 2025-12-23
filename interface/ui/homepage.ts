import { Page, expect } from '@playwright/test';

const BASE_URL = process.env.ENV === 'LOCAL' ? 'http://localhost:3333' : 'https://quickpizza.grafana.com';

export class QuickPizzaPage {
    constructor(private page: Page) { }

    async navigate() {
        await this.page.goto(BASE_URL);
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
}
