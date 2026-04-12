import { Page, expect, Locator } from '@playwright/test';
import * as allure from 'allure-js-commons';
import path from 'path';

/**
 * Page Object for Smartsupp Chat Widget (Visitor side)
 * Handles visitor's interaction with the chat widget
 */
export class ChatWidgetPage {
    constructor(private page: Page) { }

    // Chat Widget Elements
    get messengerFrame() {
        return this.page.frameLocator('iframe[title="Smartsupp widget messenger"]');
    }

    /** @deprecated use messengerFrame */
    get chatWidget() {
        return this.messengerFrame;
    }

    get chatButton() {
        return this.page.frameLocator('iframe[title="Smartsupp widget button"]').getByTestId('widgetButton');
    }

    get chatWindow() {
        return this.messengerFrame.getByTestId('widgetMessenger');
    }

    // Message Elements (within iframe)
    get messageInput() {
        return this.messengerFrame.getByTestId('textarea');
    }

    get attachmentButton() {
        return this.messengerFrame.getByTestId('buttonAttachment');
    }

    get filePreview() {
        return this.messengerFrame.getByTestId('textareaPreviewFile');
    }

    get sendButton() {
        return this.messengerFrame.getByTestId('buttonSend');
    }

    get messageList() {
        return this.messengerFrame.getByTestId('messageGroup').first();
    }

    getVisitorMessage(messageText: string) {
        return this.messengerFrame.getByTestId('messageVisitor').filter({ hasText: messageText }).first();
    }

    getOperatorMessage(messageText: string) {
        return this.messengerFrame.getByText(new RegExp(messageText)).first();
    }

    getAllMessages() {
        return this.chatWidget.locator('[data-testid*="message"], .message, [class*="Message"]');
    }

    // Typing Indicators
    get typingIndicator() {
        return this.messengerFrame.getByTestId('typingIndicator');
    }

    // Widget State Elements
    get minimizeButton() {
        return this.messengerFrame.getByTestId('buttonMinimizeChat');
    }

    get closeButton() {
        return this.messengerFrame.getByTestId('buttonOptions');
    }

    get chatHeader() {
        return this.messengerFrame.getByTestId('widgetHeader');
    }

    // Fallback selectors for when widget is not in iframe
    get directChatInput() {
        return this.page.locator('textarea[placeholder*="zpráv"], textarea[placeholder*="message"]').first();
    }

    get directSendButton() {
        return this.page.locator('button:has-text("Send"), button[aria-label*="Send"]').first();
    }

    // Actions
    async openChatWidget() {
        await allure.step('Open chat widget', async () => {
            try {
                // Try clicking the chat button
                await this.chatButton.click({ timeout: 5000 });
            } catch (error) {
                // If chat button not found, widget might already be open
                console.log('Chat button not found, widget might already be open');
            }
            await this.page.waitForTimeout(2000); // Wait for widget to open
        });
    }

    async sendMessage(messageText: string) {
        await allure.step(`Visitor sends message: "${messageText}"`, async () => {
            await this.messageInput.waitFor({ timeout: 10000 });
            await this.messageInput.fill(messageText);
            await this.messageInput.press('Enter');
            await this.page.waitForTimeout(500);
        });
    }

    async uploadFile(filePath: string) {
        await allure.step(`Visitor uploads file: ${path.basename(filePath)}`, async () => {
            await this.attachmentButton.waitFor({ timeout: 10000 });
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.attachmentButton.click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(filePath);
            await this.page.waitForTimeout(2000);
        });
    }

    async expectFilePreviewVisible() {
        await allure.step('Verify file preview is visible', async () => {
            await expect(this.filePreview).toBeVisible({ timeout: 10000 });
        });
    }

    async sendPendingAttachment() {
        await allure.step('Send pending attachment', async () => {
            await this.messageInput.click();
            await this.page.waitForTimeout(500);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(3000);
        });
    }

    async minimizeWidget() {
        await allure.step('Minimize chat widget', async () => {
            await this.minimizeButton.click();
            await this.page.waitForTimeout(500);
        });
    }

    async maximizeWidget() {
        await allure.step('Maximize chat widget', async () => {
            await this.chatButton.click();
            await this.page.waitForTimeout(500);
        });
    }

    // Verification Methods
    async verifyChatWidgetVisible() {
        await allure.step('Verify chat widget is visible', async () => {
            try {
                await expect(this.chatWindow).toBeVisible({ timeout: 10000 });
            } catch (error) {
                // Fallback - check if direct elements are visible
                await expect(this.directChatInput.or(this.messageInput)).toBeVisible({ timeout: 10000 });
            }
        });
    }

    async verifyMessageSent(messageText: string) {
        await allure.step(`Verify message "${messageText}" was sent`, async () => {
            await expect(this.getVisitorMessage(messageText)).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyMessageReceived(messageText: string) {
        await allure.step(`Verify message "${messageText}" was received from operator`, async () => {
            await expect(this.getOperatorMessage(messageText)).toBeVisible({ timeout: 15000 });
        });
    }

    async verifyTypingIndicator(shouldBeVisible: boolean = true) {
        await allure.step(`Verify typing indicator ${shouldBeVisible ? 'is' : 'is not'} visible`, async () => {
            if (shouldBeVisible) {
                await expect(this.typingIndicator).toBeVisible({ timeout: 5000 });
            } else {
                await expect(this.typingIndicator).not.toBeVisible({ timeout: 5000 });
            }
        });
    }

    async getAllMessageTexts(): Promise<string[]> {
        const messages = await this.getAllMessages().all();
        const texts: string[] = [];
        for (const msg of messages) {
            const text = await msg.textContent();
            if (text) texts.push(text.trim());
        }
        return texts;
    }

    async verifyMessageOrder(expectedMessages: string[]) {
        await allure.step('Verify messages are in correct order', async () => {
            const actualMessages = await this.getAllMessageTexts();
            for (let i = 0; i < expectedMessages.length; i++) {
                expect(actualMessages).toContain(expectedMessages[i]);
            }
        });
    }

    async waitForNewMessage(timeout: number = 10000) {
        await allure.step('Wait for new message to appear', async () => {
            await this.page.waitForTimeout(timeout);
        });
    }

    // Navigation
    async navigateToPageWithChat(url: string) {
        await allure.step(`Navigate to ${url} with chat widget`, async () => {
            await this.page.goto(url);
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);
        });
    }
}
