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
        return this.page.locator('text=AI conversations').locator('..');
    }

    get resolvedByAiStat() {
        return this.page.locator('text=Resolved by AI').locator('..');
    }

    get escalatedToHumanStat() {
        return this.page.locator('text=Escalated to human').locator('..');
    }

    get productsOfferedStat() {
        return this.page.locator('text=Products offered').locator('..');
    }

    get productsOpenedStat() {
        return this.page.locator('text=Products opened').locator('..');
    }

    // My AI Assistants Section
    get myAiAssistantsHeading() {
        return this.page.locator('h2:has-text("My AI Assistants")');
    }

    get addButton() {
        return this.page.locator('button:has-text("Add")').first();
    }

    get editButton() {
        return this.page.locator('button:has-text("Edit")');
    }

    get seeConversationsButton() {
        return this.page.locator('button:has-text("See conversations")');
    }

    get deleteButton() {
        return this.page.locator('button:has-text("Delete")');
    }

    get sortButton() {
        return this.page.locator('button:has-text("Newest")');
    }

    // Table Elements
    get tableHeader() {
        return this.page.locator('text=Title').locator('..');
    }

    get firstAssistantRow() {
        return this.page.locator('text=My first AI shopping assistant').locator('../..');
    }

    get firstAssistantCheckbox() {
        return this.page.locator('text=My first AI shopping assistant').locator('../..').locator('input[type="checkbox"]').first();
    }

    get firstAssistantOptionsButton() {
        return this.page.locator('text=My first AI shopping assistant').locator('../..').locator('button:has-text("Options")');
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

    async deleteAllBots() {
        await allure.step('Delete all existing AI bots', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/ai-automations/ai-chatbots`);
            await this.page.waitForLoadState('networkidle');

            const deleteBtn = this.page.locator('button:has-text("Delete")').first();
            while (await deleteBtn.isVisible()) {
                await deleteBtn.click();
                const confirmBtn = this.page.locator('button:has-text("Confirm"), button:has-text("Potvrdit"), button:has-text("Ano"), button:has-text("Yes")').first();
                await confirmBtn.waitFor({ state: 'visible', timeout: 5000 });
                await confirmBtn.click();
                await this.page.waitForLoadState('networkidle');
            }
        });
    }
}
