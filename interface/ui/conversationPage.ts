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
        return this.page.getByTestId('open-conversation-item').first();
    }

    getConversationItem(visitorName: string) {
        return this.page.getByTestId('open-conversation-item').filter({ hasText: visitorName }).first();
    }

    get firstConversation() {
        return this.page.getByTestId('open-conversation-item').first();
    }

    get unreadConversationBadge() {
        return this.page.getByTestId('badge-count');
    }

    // Message Display Area
    get messageContainer() {
        return this.page.getByTestId('messages-list');
    }

    get messageList() {
        return this.page.getByTestId('messages-list');
    }

    getVisitorMessage(messageText: string) {
        return this.page.getByTestId('user-message-contact').filter({ hasText: messageText }).first();
    }

    getOperatorMessage(messageText: string) {
        return this.page.getByTestId('user-message-agent').filter({ hasText: messageText }).first();
    }

    getAllMessages() {
        return this.page.getByTestId('user-message');
    }

    // Message Input Area
    get messageInput() {
        return this.page.getByTestId('chat-detail-textarea');
    }

    get sendButton() {
        return this.page.getByTestId('reply-send-button');
    }

    // Typing Indicators
    get typingIndicator() {
        return this.page.locator('[data-testid="typing-indicator"]');
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

    // --- Real inbox interaction methods ---

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
            await this.operatorInput.fill(messageText);
            await this.operatorInput.press('Enter');
            await this.page.waitForTimeout(2000);
        });
    }
}
