import { Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { getAppBaseURL } from '../../config';

export class MultichannelOnboardingPage {
    constructor(private page: Page) { }

    async navigate() {
        await allure.step('Navigate to Multichannel Onboarding page', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/onboarding/multichannel`);
            await this.page.waitForLoadState('networkidle');
        });
    }

    // Header
    get smartsuppLogo() {
        return this.page.locator('img[alt="Smartsupp"]');
    }

    // Heading & description
    get heading() {
        return this.page.locator('h2:has-text("Which channels do you use for communication?")');
    }

    get description() {
        return this.page.locator('p:has-text("Once connected, you can reply to messages from these channels directly in our app.")');
    }

    // Channel checkboxes
    get liveChatCheckbox() {
        return this.page.locator('.chakra-checkbox').filter({ hasText: 'Live chat' }).locator('input[type="checkbox"]');
    }

    get emailCheckbox() {
        return this.page.locator('.chakra-checkbox').filter({ hasText: 'Email' }).locator('input[type="checkbox"]');
    }

    get messengerCheckbox() {
        return this.page.locator('.chakra-checkbox').filter({ hasText: 'Messenger' }).locator('input[type="checkbox"]');
    }

    get whatsAppCheckbox() {
        return this.page.locator('.chakra-checkbox').filter({ hasText: 'WhatsApp' }).locator('input[type="checkbox"]');
    }

    get miraAiCheckbox() {
        return this.page.locator('.chakra-checkbox').filter({ hasText: 'Mira AI for your website' }).locator('input[type="checkbox"]');
    }

    // AI section divider label
    get aiSectionLabel() {
        return this.page.locator('p:has-text("automate conversations with AI operator")');
    }

    // Mira AI card
    get miraAiTitle() {
        return this.page.locator('p:has-text("Mira AI for your website")');
    }

    get miraAiDescription() {
        return this.page.locator('p:has-text("Answers FAQs, helps customers with shopping")');
    }

    // Action buttons
    get backButton() {
        return this.page.locator('button[aria-label="Back"]');
    }

    get letsGetStartedButton() {
        return this.page.locator('button:has-text("Let\'s get started!")');
    }

    // Actions
    async selectChannel(channel: 'Live chat' | 'Email' | 'Messenger' | 'WhatsApp' | 'Mira AI for your website') {
        await allure.step(`Select channel: ${channel}`, async () => {
            const card = this.page.locator('p').filter({ hasText: channel })
                .locator('xpath=ancestor::div[.//input[@type="checkbox"]][1]');
            await card.locator('input[type="checkbox"]').check({ force: true });
        });
    }

    async clickLetsGetStarted() {
        await allure.step('Click "Let\'s get started!" button', async () => {
            await this.letsGetStartedButton.click();
        });
    }

    async clickBack() {
        await allure.step('Click Back button', async () => {
            await this.backButton.click();
        });
    }

    // Verifications
    async verifyPageLoaded() {
        await allure.step('Verify Multichannel Onboarding page is loaded', async () => {
            await expect(this.heading).toBeVisible();
            await expect(this.description).toBeVisible();
        });
    }

    async verifyAllChannelsVisible() {
        await allure.step('Verify all channel options are visible', async () => {
            await expect(this.page.locator('p:has-text("Live chat")')).toBeVisible();
            await expect(this.page.locator('p:has-text("Email")')).toBeVisible();
            await expect(this.page.locator('p:has-text("Messenger")')).toBeVisible();
            await expect(this.page.locator('p:has-text("WhatsApp")')).toBeVisible();
            await expect(this.miraAiTitle).toBeVisible();
        });
    }

    async verifyChannelChecked(channel: 'Live chat' | 'Email' | 'Messenger' | 'WhatsApp' | 'Mira AI for your website') {
        await allure.step(`Verify channel "${channel}" is checked`, async () => {
            const checkbox = this.page.locator('.chakra-checkbox').filter({ hasText: channel }).locator('input[type="checkbox"]');
            await expect(checkbox).toBeChecked();
        });
    }

    async verifyLetsGetStartedEnabled() {
        await allure.step('Verify "Let\'s get started!" button is enabled', async () => {
            await expect(this.letsGetStartedButton).toBeEnabled();
        });
    }

    async verifyLetsGetStartedDisabled() {
        await allure.step('Verify "Let\'s get started!" button is disabled', async () => {
            await expect(this.letsGetStartedButton).toBeDisabled();
        });
    }
}
