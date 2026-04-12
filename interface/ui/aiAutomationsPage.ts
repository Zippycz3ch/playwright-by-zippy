import { Page } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { getAppBaseURL } from '../../config';

export class AIAutomationsPage {
    constructor(private page: Page) { }

    get serviceBusinessCategoryButton() {
        return this.page.getByTestId('ai-onboarding-survey-option-web').first();
    }

    get websiteUrlInput() {
        return this.page.getByTestId('ai-onboarding-input-web-url');
    }

    get retrievePagesButton() {
        return this.page.locator('button:has-text("Retrieve pages")');
    }

    get botCreationNameInput() {
        return this.page.getByTestId('chatbot-identity-modal-name-input');
    }

    get avatarUploadSection() {
        return this.page.getByTestId('chatbot-identity-avatar-upload');
    }

    getAvatarOption(index: 1 | 2 | 3 | 4 | 5 | 6) {
        return this.page.locator(`div[role="button"]:has(img[src*="/chatbots/avatars/${index}.webp"])`);
    }

    get continueButton() {
        return this.page.getByTestId('ai-onboarding-primary-button').first();
    }

    async navigateToOnboarding() {
        await allure.step('Navigate to AI Automations onboarding', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/ai-automations/onboarding`);
            await this.page.waitForLoadState('networkidle');
        });
    }

    async selectBusinessCategory() {
        await allure.step('Select business category', async () => {
            await this.serviceBusinessCategoryButton.click();
        });
    }

    async enterWebsiteUrl(url: string) {
        await allure.step(`Enter website URL: ${url}`, async () => {
            await this.websiteUrlInput.waitFor({ state: 'visible' });
            await this.websiteUrlInput.fill(url);
        });
    }

    async selectAvatar(index: 1 | 2 | 3 | 4 | 5 | 6) {
        await allure.step(`Select avatar ${index}`, async () => {
            await this.getAvatarOption(index).click();
        });
    }

    async clickContinue() {
        await allure.step('Click Continue button', async () => {
            await this.continueButton.waitFor({ state: 'visible' });
            await this.continueButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async completeOnboarding(websiteUrl: string = 'example.com', avatarIndex: 1 | 2 | 3 | 4 | 5 | 6 = 4): Promise<string> {
        let botName = '';
        await allure.step('Complete AI Bot onboarding', async () => {
            await this.continueButton.waitFor({ state: 'visible' });
            await this.continueButton.click();

            await this.selectBusinessCategory();
            await this.clickContinue();
            await this.enterWebsiteUrl(websiteUrl);
            await this.retrievePagesButton.click();
            await this.clickContinue();
            const suffix = Math.random().toString(36).substring(2, 7);
            botName = `My AI Assistant ${suffix}`;
            await this.botCreationNameInput.fill(botName);
            botName = await this.botCreationNameInput.inputValue();
            // await this.selectAvatar(avatarIndex);    

            await this.clickContinue();
            await this.clickContinue();
        });
        return botName;
    }

}

