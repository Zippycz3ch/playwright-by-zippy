import { Page, expect, Locator } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { getAppBaseURL } from '../../config';

/**
 * Page Object for Smartsupp Operator Conversation/Inbox functionality
 * Handles the operator side of chat communication
 */
export class ConversationPage {
    constructor(private page: Page) { }

    // Navigation
    async navigateToInbox() {
        await allure.step('Navigate to Inbox/Conversations', async () => {
            await this.page.goto(`${getAppBaseURL()}/dashboard/inbox`);
            await this.page.waitForLoadState('networkidle');
        });
    }

    // Conversation List Elements
    get conversationList() {
        return this.page.locator('[data-testid="conversation-list"], .conversation-list, [class*="ConversationList"]');
    }

    getConversationItem(visitorName: string) {
        return this.page.locator(`[data-testid="conversation-item"]:has-text("${visitorName}"), .conversation-item:has-text("${visitorName}")`).first();
    }

    get firstConversation() {
        return this.page.locator('[data-testid="conversation-item"], .conversation-item').first();
    }

    get unreadConversationBadge() {
        return this.page.locator('[data-testid="unread-badge"], .unread-badge, [class*="unread"]');
    }

    // Message Display Area
    get messageContainer() {
        return this.page.locator('[data-testid="message-container"], .message-container, [class*="MessageContainer"], [class*="ChatWindow"]');
    }

    get messageList() {
        return this.page.locator('[data-testid="message-list"], .message-list, [class*="MessageList"]');
    }

    getVisitorMessage(messageText: string) {
        return this.page.locator(`[data-testid="visitor-message"]:has-text("${messageText}"), .visitor-message:has-text("${messageText}"), [class*="VisitorMessage"]:has-text("${messageText}")`).first();
    }

    getOperatorMessage(messageText: string) {
        return this.page.locator(`[data-testid="operator-message"]:has-text("${messageText}"), .operator-message:has-text("${messageText}"), [class*="OperatorMessage"]:has-text("${messageText}")`).first();
    }

    getAllMessages() {
        return this.page.locator('[data-testid*="message"], .message, [class*="Message"][class*="Content"]');
    }

    // Message Input Area
    get messageInput() {
        return this.page.locator('[data-testid="message-input"], textarea[placeholder*="zpráv"], textarea[placeholder*="message"], [contenteditable="true"]').first();
    }

    get sendButton() {
        return this.page.locator('[data-testid="send-button"], button[aria-label*="Send"], button[type="submit"]:near(textarea)').first();
    }

    // Typing Indicators
    get typingIndicator() {
        return this.page.locator('[data-testid="typing-indicator"], .typing-indicator, [class*="TypingIndicator"]');
    }

    // Conversation Actions
    async openConversation(visitorName: string) {
        await allure.step(`Open conversation with ${visitorName}`, async () => {
            await this.getConversationItem(visitorName).click();
            await this.page.waitForTimeout(1000); // Wait for conversation to load
        });
    }

    async openFirstConversation() {
        await allure.step('Open first conversation from list', async () => {
            await this.firstConversation.click();
            await this.page.waitForTimeout(1000);
        });
    }

    async sendMessage(messageText: string) {
        await allure.step(`Send message: "${messageText}"`, async () => {
            await this.messageInput.fill(messageText);
            await this.sendButton.click();
            await this.page.waitForTimeout(500); // Wait for message to be sent
        });
    }

    async sendMessageWithEnter(messageText: string) {
        await allure.step(`Send message with Enter: "${messageText}"`, async () => {
            await this.messageInput.fill(messageText);
            await this.messageInput.press('Enter');
            await this.page.waitForTimeout(500);
        });
    }

    // Verification Methods
    async verifyInboxLoaded() {
        await allure.step('Verify Inbox page is loaded', async () => {
            await expect(this.conversationList.or(this.messageContainer)).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyMessageReceived(messageText: string, fromVisitor: boolean = true) {
        await allure.step(`Verify message "${messageText}" received from ${fromVisitor ? 'visitor' : 'operator'}`, async () => {
            const messageLocator = fromVisitor ? this.getVisitorMessage(messageText) : this.getOperatorMessage(messageText);
            await expect(messageLocator).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyMessageSent(messageText: string) {
        await allure.step(`Verify message "${messageText}" was sent`, async () => {
            const sentMessage = this.getOperatorMessage(messageText);
            await expect(sentMessage).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyConversationExists(visitorName: string) {
        await allure.step(`Verify conversation with ${visitorName} exists`, async () => {
            await expect(this.getConversationItem(visitorName)).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyUnreadBadge() {
        await allure.step('Verify unread message badge is visible', async () => {
            await expect(this.unreadConversationBadge).toBeVisible({ timeout: 5000 });
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
}
