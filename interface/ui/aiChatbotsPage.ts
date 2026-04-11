import { Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { getAppBaseURL } from '../../config';

export class AiChatbotsPage {
    constructor(private page: Page) { }

    // Page Elements
    get pageHeading() {
        return this.page.locator('h1:has-text("AI Assistants")');
    }

    get addNewButton() {
        return this.page.getByTestId('chatbot-garage-new-bot');
    }

    get searchBox() {
        return this.page.locator('input[type="search"]');
    }

    // Task Completion Section
    get taskSectionHeading() {
        return this.page.locator('h2:has-text("Finish all the tasks")');
    }

    get collapseTasksButton() {
        return this.page.locator('button:has-text("Collapse")');
    }

    get scrapeWebsiteTask() {
        return this.page.locator('h4:has-text("Scrape more pages from your website")');
    }

    get addProductFeedTask() {
        return this.page.locator('h4:has-text("Add your product feed")');
    }

    get updateKnowledgeTask() {
        return this.page.locator('h4:has-text("Update and adjust Mira")');
    }

    get publishAssistantTask() {
        return this.page.locator('h4:has-text("Publish your AI Assistant")');
    }

    // Summary Statistics
    get summaryHeading() {
        return this.page.locator('h2:has-text("Summary")');
    }

    get aiConversationsStat() {
        return this.page.getByTestId('garage-statistics-item-chatbot-chatbotConversations');
    }

    get resolvedByAiStat() {
        return this.page.getByTestId('garage-statistics-item-chatbot-resolved');
    }

    get escalatedToHumanStat() {
        return this.page.getByTestId('garage-statistics-item-chatbot-escalated');
    }

    get productsOfferedStat() {
        return this.page.getByTestId('garage-statistics-item-chatbot-productsSent');
    }

    get productsOpenedStat() {
        return this.page.getByTestId('garage-statistics-item-chatbot-productsOpened');
    }

    // My AI Assistants Section
    get myAiAssistantsHeading() {
        return this.page.locator('h2:has-text("My AI Assistants")');
    }

    get addButton() {
        return this.page.getByTestId('chatbot-garage-new-bot');
    }

    get editButton() {
        return this.page.getByTestId('chatbot-card-dropdown-edit');
    }

    get seeConversationsButton() {
        return this.page.locator('button:has-text("See conversations")');
    }

    get deleteButton() {
        return this.page.getByTestId('chatbot-card-dropdown-remove');
    }

    get sortButton() {
        return this.page.locator('button:has-text("Newest")');
    }

    // Table Elements
    get tableHeader() {
        return this.page.locator('text=Title').locator('..');
    }

    get firstAssistantRow() {
        return this.page.getByTestId('chatbot-card').first();
    }

    get firstAssistantCheckbox() {
        return this.page.getByTestId('chatbot-card-switch').first();
    }

    get firstAssistantOptionsButton() {
        return this.page.getByTestId('chatbot-card-dropdown').first();
    }

    // Bot Creation Modal Elements
    get botCreationNameInput() {
        return this.page.getByTestId('chatbot-identity-modal-name-input');
    }

    // Bot Workflow (Editor) Page Elements
    get botNameInput() {
        return this.page.getByTestId('chatbot-builder-title');
    }

    get saveBotButton() {
        return this.page.getByTestId('chatbot-builder-preview');
    }

    get publishBotButton() {
        return this.page.locator('#chatbot-workflow-form').getByTestId('chatbot-workflow-form-publish-btn');
    }

    get publishAnywayButton() {
        return this.page.getByTestId('confirm-modal-cancel');
    }

    get botOptionsButton() {
        return this.page.getByTestId('chatbot-builder-dropdown-toggler');
    }

    get deleteBotFromEditorButton() {
        return this.page.getByTestId('chatbot-builder-dropdown-remove');
    }

    get behaviorTab() {
        return this.page.getByTestId('chatbot-workflow-tab-basics');
    }

    get knowledgeTabButton() {
        return this.page.getByTestId('chatbot-workflow-tab-customResponses');
    }

    get goBackButton() {
        return this.page.getByTestId('fullPageLayout-goBackBtn');
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

    get deleteModalConfirmButton() {
        return this.page.getByTestId('delete-modal-confirm');
    }

    get deleteModalCancelButton() {
        return this.page.getByTestId('delete-modal-cancel');
    }

    // Navigation Methods
    async navigate() {
        await allure.step('Navigate to AI Chatbots page and verify page loaded', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/ai-automations/ai-chatbots`);
            await this.page.waitForLoadState('networkidle');

            // Verify URL
            await expect(this.page).toHaveURL(/ai-automations\/ai-chatbots/);

            // Verify main page elements are visible
            await expect(this.pageHeading).toBeVisible();
            await expect(this.addNewButton).toBeVisible();
            await expect(this.myAiAssistantsHeading).toBeVisible();
        });
    }

    getBotByName(name: string) {
        return this.page.getByTestId('chatbot-card-title-text').filter({ hasText: name });
    }

    async publishNewBot() {
        await allure.step('Complete bot setup and publish', async () => {
            await this.continueButton.click();
            await this.continueButton.click();
            await this.continueButton.click();
            await this.continueButton.click();
            await this.publishBotButton.waitFor({ state: 'visible' });
            await this.publishBotButton.click();
            await this.publishAnywayButton.click();
        });
    }

    // Actions
    async clickAddNew() {
        await allure.step('Click Add New button', async () => {
            await this.addNewButton.click();
        });
    }

    async searchAssistant(searchTerm: string) {
        await allure.step(`Search for AI Assistant: ${searchTerm}`, async () => {
            await this.searchBox.fill(searchTerm);
        });
    }

    async selectFirstAssistant() {
        await allure.step('Select first AI Assistant', async () => {
            await this.firstAssistantCheckbox.check();
        });
    }

    async clickEdit() {
        await allure.step('Click Edit button', async () => {
            await this.editButton.click();
        });
    }

    async clickSeeConversations() {
        await allure.step('Click See Conversations button', async () => {
            await this.seeConversationsButton.click();
        });
    }

    async clickDelete() {
        await allure.step('Click Delete button', async () => {
            await this.deleteButton.click();
        });
    }

    async openFirstAssistantOptions() {
        await allure.step('Open first AI Assistant options menu', async () => {
            await this.firstAssistantOptionsButton.click();
        });
    }

    async collapseTaskSection() {
        await allure.step('Collapse task completion section', async () => {
            await this.collapseTasksButton.click();
        });
    }

    async setBotName(name: string) {
        await allure.step(`Set bot name to "${name}"`, async () => {
            // Dismiss any notification overlays that may intercept pointer events
            await this.page.keyboard.press('Escape');
            await this.botNameInput.click({ force: true });
            await this.page.keyboard.press('Control+a');
            await this.botNameInput.pressSequentially(name);
            await this.page.keyboard.press('Tab');
        });
    }

    async saveBotChanges() {
        await allure.step('Save bot changes', async () => {
            await expect(this.saveBotButton).toBeEnabled({ timeout: 5000 });
            await this.saveBotButton.click();
            await this.page.waitForTimeout(1000);
        });
    }

    async editBehaviorSlider(slider: 'tone' | 'talkativeness' | 'confidence' | 'emoji', value: string) {
        await allure.step(`Set ${slider} to "${value}"`, async () => {
            const sliderMap = {
                tone: this.toneInput,
                talkativeness: this.talkativenessInput,
                confidence: this.confidenceInput,
                emoji: this.emojiInput,
            };
            await sliderMap[slider].locator('p').filter({ hasText: value }).first().click();
        });
    }

    async deleteCurrentBotFromEditor() {
        await allure.step('Delete current bot from editor', async () => {
            await this.botOptionsButton.click();
            await this.deleteBotFromEditorButton.click();
            await this.deleteModalConfirmButton.waitFor({ state: 'visible' });
            await this.deleteModalConfirmButton.click();
            await this.page.waitForURL(/ai-chatbots/);
        });
    }

    async deleteAllBots() {
        await allure.step('Delete all existing AI bots', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/ai-automations/ai-chatbots`);
            await this.page.waitForLoadState('networkidle');

            const deleteBtn = this.page.getByTestId('chatbot-card-dropdown-remove').first();
            while (await deleteBtn.isVisible()) {
                await this.page.getByTestId('chatbot-card-dropdown').first().click();
                await deleteBtn.click();
                await this.deleteModalConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
                await this.deleteModalConfirmButton.click();
                await this.page.waitForLoadState('networkidle');
            }
        });
    }
}
