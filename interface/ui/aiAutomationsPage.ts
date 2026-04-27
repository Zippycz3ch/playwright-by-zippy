import { Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { getAppBaseURL } from '../../config';

export class AIAutomationsPage {
    constructor(private page: Page) { }

    // Onboarding elements
    get onboardingPrimaryButton() {
        return this.page.locator('[data-testid="ai-onboarding-primary-button"]').first();
    }

    get serviceWebsiteOption() {
        return this.page.locator('[data-testid="ai-onboarding-survey-option-web"]').first();
    }

    get websiteUrlInput() {
        return this.page.locator('[data-testid="ai-onboarding-input-web-url"]');
    }

    get continueButton() {
        return this.page.locator('button:has-text("Pokračovat"), button:has-text("Continue")').first();
    }

    get finishButton() {
        return this.page.locator('button:has-text("Dokončit"), button:has-text("Finish")').first();
    }

    // AI Bot List
    get aiBotList() {
        return this.page.locator('[data-testid="ai-bot-list"], .ai-bot-item').first();
    }

    get firstAIBot() {
        return this.page.locator('[data-testid="ai-bot-item"], .ai-bot-card').first();
    }

    // Edit Bot elements
    get editBotButton() {
        return this.page.locator('button:has-text("Upravit"), button:has-text("Edit"), [aria-label="Edit"]').first();
    }

    get botNameInput() {
        return this.page.locator('input[name="botName"], input[placeholder*="jméno"], input[placeholder*="name"]').first();
    }

    get botDescriptionInput() {
        return this.page.locator('textarea[name="description"], textarea[placeholder*="popis"]').first();
    }

    get knowledgeTab() {
        return this.page.locator('button:has-text("Znalosti"), button:has-text("Knowledge"), [role="tab"]:has-text("Znalosti")').first();
    }

    get enableSourceToggle() {
        return this.page.locator('input[type="checkbox"][role="switch"], .toggle-switch').first();
    }

    get publishButton() {
        return this.page.locator('button:has-text("Publikovat"), button:has-text("Publish")').first();
    }

    get deleteButton() {
        return this.page.locator('button:has-text("Smazat"), button:has-text("Delete")').first();
    }

    get confirmDeleteButton() {
        return this.page.locator('button:has-text("Potvrdit"), button:has-text("Confirm"), button:has-text("Ano")').first();
    }

    async navigateToOnboarding() {
        await allure.step('Navigate to AI Automations onboarding', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/ai-automations/onboarding`);
            await this.page.waitForLoadState('networkidle');
        });
    }

    async waitForOnboardingPage() {
        await allure.step('Wait for automatic onboarding redirect', async () => {
            // Wait for onboarding to load after bot deletion
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(1000);
            // Wait for the onboarding primary button to appear (sign of onboarding page)
            await this.onboardingPrimaryButton.waitFor({ state: 'visible', timeout: 10000 });
        });
    }

    async navigateToAIAutomations() {
        await allure.step('Navigate to AI Automations', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/ai-automations`);
            await this.page.waitForLoadState('load');
            await this.page.waitForTimeout(2000);
        });
    }

    async clickPrimaryButton() {
        await allure.step('Click onboarding primary button', async () => {
            await this.onboardingPrimaryButton.click();
            await this.page.waitForTimeout(500);
        });
    }

    async selectServiceWebsiteOption() {
        await allure.step('Select "I have a service website" option', async () => {
            await this.serviceWebsiteOption.click();
            await this.page.waitForTimeout(500);
        });
    }

    async enterWebsiteUrl(url: string) {
        await allure.step(`Enter website URL: ${url}`, async () => {
            await this.websiteUrlInput.fill(url);
            await this.page.waitForTimeout(300);
        });
    }

    async clickContinue() {
        await allure.step('Click Continue button', async () => {
            await this.continueButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async clickFinish() {
        await allure.step('Click Finish button', async () => {
            await this.finishButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async completeOnboarding(websiteUrl: string = 'example.com') {
        await allure.step('Complete AI Bot onboarding', async () => {
            // Click start button
            await this.page.locator('[data-testid="ai-onboarding-primary-button"]').click();
            await this.page.waitForTimeout(500);

            // Click service website option
            await this.page.locator('[data-testid="ai-onboarding-survey-option-web"]').click();
            await this.page.waitForTimeout(500);

            // Click continue
            await this.page.locator('[data-testid="ai-onboarding-primary-button"]').click();
            await this.page.waitForTimeout(500);

            // Fill URL
            await this.page.locator('[data-testid="ai-onboarding-input-web-url"]').fill(websiteUrl);
            await this.page.waitForTimeout(500);

            // Click "Retrieve pages" button
            await this.page.locator('button:has-text("Retrieve pages")').click();
            await this.page.waitForTimeout(3000);

            // Click continue
            await this.page.locator('[data-testid="ai-onboarding-primary-button"]').click({ force: true });
            await this.page.waitForLoadState('networkidle').catch(() => { });


        });
    }

    async editBotParameter(parameterName: string, value: string) {
        await allure.step(`Edit bot parameter: ${parameterName} = ${value}`, async () => {
            const input = this.page.locator(`input[name="${parameterName}"], textarea[name="${parameterName}"]`).first();
            await input.fill(value);
        });
    }

    async enableKnowledgeSource() {
        await allure.step('Enable knowledge source (webscrape)', async () => {
            await this.knowledgeTab.click();
            await this.page.waitForTimeout(500);
            await this.enableSourceToggle.check();
        });
    }

    async publishBot() {
        await allure.step('Publish AI Bot', async () => {
            await this.publishButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async deleteBot() {
        await allure.step('Delete AI Bot', async () => {
            // First, select the bot using checkbox
            const checkbox = this.page.locator('.chakra-checkbox__input[type="checkbox"]').first();
            await checkbox.check({ force: true });
            await this.page.waitForTimeout(1000);

            // Click delete button with aria-label="Delete"
            const deleteButton = this.page.getByRole('button', { name: 'Delete' });
            await deleteButton.click();
            await this.page.waitForTimeout(1000);

            // Confirm deletion in modal popup
            const confirmButton = this.page.locator('[data-testid="delete-modal-confirm"]');
            await confirmButton.waitFor({ state: 'visible', timeout: 10000 });
            await confirmButton.click();
            await this.page.waitForTimeout(2000);
            await this.page.waitForLoadState('networkidle');
        });
    }

    async verifyBotExists() {
        await allure.step('Verify AI Bot exists', async () => {
            await expect(this.firstAIBot).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyBotDeleted() {
        await allure.step('Verify AI Bot is deleted', async () => {
            await expect(this.firstAIBot).not.toBeVisible({ timeout: 10000 });
        });
    }
}
