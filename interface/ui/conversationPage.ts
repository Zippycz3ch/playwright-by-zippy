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

    async verifyMessageInConversationDetail(messageText: string) {
        await allure.step(`Verify received message content matches sent message: "${messageText}"`, async () => {
            const messageLocator = this.page.getByText(messageText).last();
            await messageLocator.waitFor({ timeout: 10000 });
            await expect(messageLocator).toContainText(messageText);
        });
    }

    async verifyFileConversationInInbox(fileName: string) {
        await allure.step(`Verify file conversation "${fileName}" appears in inbox`, async () => {
            await expect(this.page.getByRole('button', { name: new RegExp(fileName, 'i') }).first()).toBeVisible({ timeout: 10000 });
        });
    }

    async openConversationByFile(fileName: string) {
        await allure.step(`Open conversation with file "${fileName}"`, async () => {
            await this.page.getByRole('button', { name: new RegExp(fileName, 'i') }).first().click();
            await this.page.waitForTimeout(2000);
        });
    }

    async verifyFileAttachmentVisible(fileName: string) {
        await allure.step(`Verify file attachment "${fileName}" is visible`, async () => {
            await expect(this.page.getByRole('link', { name: new RegExp(fileName, 'i') }).first()).toBeVisible({ timeout: 10000 });
        });
    }
}
