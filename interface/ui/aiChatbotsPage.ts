import { Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { getAppBaseURL } from '../../config';

type HandoverOption = 'Never handover to an operator' | 'Handover when convenient or on demand';

export class AiChatbotsPage {
    constructor(private page: Page) { }

    // Page Elements
    get pageHeading() {
        return this.page.locator('h1:has-text("AI Assistants")');
    }

    get addNewButton() {
        return this.page.getByTestId('chatbot-garage-new-bot');
    }

    // My AI Assistants Section
    get myAiAssistantsHeading() {
        return this.page.locator('h2:has-text("My AI Assistants")');
    }

    get editButton() {
        return this.page.getByTestId('chatbot-card-dropdown-edit');
    }

    // Bot Workflow (Editor) Page Elements
    get botDisplayName() {
        return this.page.locator('p.chakra-text.css-9ztjch');
    }

    get saveBotButton() {
        return this.page.getByTestId('chatbot-builder-preview');
    }

    get publishButton() {
        return this.page.getByTestId('chatbot-workflow-form-publish-btn').filter({ hasText: /^Publish( changes)?$/ });
    }

    get unpublishButton() {
        return this.page.getByTestId('chatbot-workflow-form-publish-btn').filter({ hasText: /^Unpublish$/ });
    }

    get publishAnywayButton() {
        return this.page.getByTestId('confirm-modal-cancel');
    }

    get behaviorTab() {
        return this.page.getByTestId('chatbot-workflow-tab-basics');
    }

    get skillsTabButton() {
        return this.page.getByTestId('chatbot-workflow-tab-skills');
    }

    getSkillButton(name: 'Handover to an operator' | 'Product recommendation') {
        return this.page.getByTestId('chatbot-workflow-skills-item-button').filter({ hasText: name });
    }

    async openSkill(name: 'Handover to an operator' | 'Product recommendation') {
        await allure.step(`Open skill: ${name}`, async () => {
            await this.getSkillButton(name).click();
        });
    }

    getHandoverOption(option: HandoverOption) {
        return this.page.locator('label.chakra-radio').filter({ has: this.page.locator('p', { hasText: option }) });
    }

    async getSelectedHandoverOption(): Promise<HandoverOption> {
        const options: HandoverOption[] = ['Never handover to an operator', 'Handover when convenient or on demand'];
        for (const option of options) {
            const attr = await this.getHandoverOption(option).getAttribute('data-checked');
            if (attr !== null) return option;
        }
        throw new Error('No handover option is selected');
    }

    async selectHandoverOption(option: HandoverOption) {
        await allure.step(`Select handover option: ${option}`, async () => {
            await this.getHandoverOption(option).locator('span.chakra-radio__control').click();
        });
    }

    async verifyHandoverOption(option: HandoverOption) {
        await allure.step(`Verify handover option is set to: "${option}"`, async () => {
            await expect(this.getHandoverOption(option)).toHaveAttribute('data-checked', '');
        });
    }

    get welcomeMessageTab() {
        return this.page.getByTestId('chatbot-workflow-tab-welcomeMessage');
    }

    async clickWelcomeMessageTab() {
        await allure.step('Click Welcome Message tab', async () => {
            await expect(this.welcomeMessageTab).toBeVisible({ timeout: 15_000 });
            await this.welcomeMessageTab.dispatchEvent('click');
        });
    }

    get welcomeMessageDropdownIndicator() {
        return this.page.locator('[class*="indicatorContainer"][aria-hidden="true"]').first();
    }

    async clickWelcomeMessageDropdownIndicator() {
        await allure.step('Click Welcome Message dropdown indicator', async () => {
            await this.welcomeMessageDropdownIndicator.waitFor({ state: 'visible' });
            await this.welcomeMessageDropdownIndicator.click();
        });
    }

    get toneInput() {
        return this.page.getByTestId('chatbot-workflow-profile-input-tone');
    }

    get talkativenessInput() {
        return this.page.getByTestId('chatbot-workflow-profile-input-talkativeness');
    }

    get confidenceInput() {
        return this.page.getByTestId('chatbot-workflow-profile-input-confidence');
    }

    get emojiInput() {
        return this.page.getByTestId('chatbot-workflow-profile-input-emoji');
    }

    get continueButton() {
        return this.page.getByTestId('chatbot-workflow-form-continue-btn');
    }

    // Navigation Methods
    async navigate() {
        await allure.step('Navigate to AI Chatbots page and verify page loaded', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/ai-automations/ai-chatbots`);

            // Verify URL
            await expect(this.page).toHaveURL(/ai-automations\/ai-chatbots/);

            // Verify main page elements are visible
            await expect(this.pageHeading).toBeVisible();
            await expect(this.addNewButton).toBeVisible();
            await expect(this.myAiAssistantsHeading).toBeVisible();
        });
    }

    async publishNewBot() {
        await allure.step('Complete bot setup and publish', async () => {
            await this.continueButton.click();
            await this.continueButton.click();
            await this.continueButton.click();
            await this.continueButton.click();
            const publishBtn = this.page.locator('#chatbot-workflow-form').getByTestId('chatbot-workflow-form-publish-btn').filter({ hasText: /^Publish( changes)?$/ });
            await publishBtn.waitFor({ state: 'visible' });
            await publishBtn.click();
            await this.publishAnywayButton.click();
        });
    }

    // Actions
    async clickAddNew() {
        await allure.step('Click Add New button', async () => {
            await this.addNewButton.click();
        });
    }

    async clickEdit() {
        await allure.step('Click Edit button', async () => {
            await this.editButton.click();
        });
    }

    async openBotOptions(index: number = 0) {
        await allure.step('Open first AI Assistant options menu', async () => {
            await this.page.getByTestId('chatbot-card').nth(index).hover();
            await this.page.getByTestId('chatbot-card-dropdown').nth(index).click();
        });
    }

    async openBotEditor(index: number = 0) {
        await allure.step('Open bot editor', async () => {
            await this.openBotOptions(index);
            await this.clickEdit();
        });
    }

    async saveBotChanges() {
        await allure.step('Save bot changes', async () => {
            const isEnabled = await this.saveBotButton.isEnabled();
            if (!isEnabled) {
                await allure.step('No changes detected, skipping save', async () => { });
                return;
            }
            await this.saveBotButton.click();
            await expect(this.page.getByText('Changes have been saved successfully.').first()).toBeVisible({ timeout: 10_000 });
        });
    }

    async saveAndPublish() {
        await allure.step('Save and publish bot', async () => {
            await this.saveBotChanges();
            await this.publishButton.waitFor({ state: 'visible' });
            await this.publishButton.click();
            await this.publishAnywayButton.click();
            await expect(this.page.getByText('Changes saved successfully and chatbot has been published.').first()).toBeVisible({ timeout: 10_000 });
        });
    }

    async editBehaviorSlider(slider: 'tone' | 'talkativeness' | 'confidence' | 'emoji', value: number) {
        await allure.step(`Set ${slider} to ${value}`, async () => {
            const sliderMap = {
                tone: this.toneInput,
                talkativeness: this.talkativenessInput,
                confidence: this.confidenceInput,
                emoji: this.emojiInput,
            };
            const thumb = sliderMap[slider].locator('[role="slider"]');
            await thumb.focus();
            await this.page.keyboard.press('Home');
            for (let i = 0; i < value; i++) {
                await this.page.keyboard.press('ArrowRight');
            }
        });
    }
}
