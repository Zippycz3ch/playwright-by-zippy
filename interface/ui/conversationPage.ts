import { Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

export class ConversationPage {
    constructor(private page: Page) { }

    get inboxNewFilter() {
        return this.page.getByTestId('chats-open-filters-unserved');
    }

    get operatorInput() {
        return this.page.getByTestId('chat-detail-textarea');
    }

    async switchToNewConversations() {
        await allure.step('Switch to New conversations filter', async () => {
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
            await this.inboxNewFilter.click();
            await this.page.waitForTimeout(2000);
        });
    }

    async expectMessageInList(messageText: string) {
        await allure.step(`Expect message in conversation list: "${messageText}"`, async () => {
            await expect(this.page.getByText(messageText)).toBeVisible({ timeout: 10000 });
        });
    }

    async openConversationByText(messageText: string) {
        await allure.step(`Open conversation containing: "${messageText}"`, async () => {
            await this.page.getByText(messageText).click();
            await this.page.waitForTimeout(2000);
        });
    }

    async sendOperatorMessage(messageText: string) {
        await allure.step(`Operator sends response: "${messageText}"`, async () => {
            await this.operatorInput.waitFor({ timeout: 10000 });
            await this.operatorInput.click();
            await this.operatorInput.pressSequentially(messageText);
            await this.operatorInput.press('Enter');
            await this.page.waitForTimeout(2000);
        });
    }
}
