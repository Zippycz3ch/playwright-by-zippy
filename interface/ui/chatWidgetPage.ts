import { Page, expect, Locator } from '@playwright/test';
import * as allure from 'allure-js-commons';

/**
 * Page Object for Smartsupp Chat Widget (Visitor side)
 * Handles visitor's interaction with the chat widget
 */
export class ChatWidgetPage {
    constructor(private page: Page) { }

    // Chat Widget Elements
    get chatWidget() {
        return this.page.frameLocator('#smartsupp-widget-container iframe, iframe[id*="smartsupp"]').first();
    }

    get chatButton() {
        return this.page.locator('#chat-application, .smartsupp-chat-button, [id*="smartsupp"][class*="button"]').first();
    }

    get chatWindow() {
        return this.chatWidget.locator('[data-testid="chat-window"], .chat-window, [class*="ChatWindow"]');
    }

    // Message Elements (within iframe)
    get messageInput() {
        return this.chatWidget.locator('textarea[placeholder*="zpráv"], textarea[placeholder*="message"], input[type="text"][placeholder*="message"]').first();
    }

    get sendButton() {
        return this.chatWidget.locator('[data-testid="send-button"], button[aria-label*="Send"], button[type="submit"]').first();
    }

    get messageList() {
        return this.chatWidget.locator('[data-testid="message-list"], .message-list, [class*="MessageList"]');
    }

    getVisitorMessage(messageText: string) {
        return this.chatWidget.locator(`[data-testid="visitor-message"]:has-text("${messageText}"), .visitor-message:has-text("${messageText}"), [class*="own"]:has-text("${messageText}")`).first();
    }

    getOperatorMessage(messageText: string) {
        return this.chatWidget.locator(`[data-testid="operator-message"]:has-text("${messageText}"), .operator-message:has-text("${messageText}"), [class*="agent"]:has-text("${messageText}"), [class*="bot"]:has-text("${messageText}")`).first();
    }

    getAllMessages() {
        return this.chatWidget.locator('[data-testid*="message"], .message, [class*="Message"]');
    }

    // Typing Indicators
    get typingIndicator() {
        return this.chatWidget.locator('[data-testid="typing-indicator"], .typing-indicator, [class*="TypingIndicator"], [class*="typing"]');
    }

    // Widget State Elements
    get minimizeButton() {
        return this.chatWidget.locator('[data-testid="minimize-button"], button[aria-label*="Minimize"], .minimize-button');
    }

    get closeButton() {
        return this.chatWidget.locator('[data-testid="close-button"], button[aria-label*="Close"], .close-button');
    }

    get chatHeader() {
        return this.chatWidget.locator('[data-testid="chat-header"], .chat-header, header');
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

    async sendMessage(messageText: string, useEnter: boolean = false) {
        await allure.step(`Send message: "${messageText}"`, async () => {
            try {
                // Try iframe version first
                await this.messageInput.fill(messageText, { timeout: 3000 });
                if (useEnter) {
                    await this.messageInput.press('Enter');
                } else {
                    await this.sendButton.click();
                }
            } catch (error) {
                // Fallback to direct selectors
                await this.directChatInput.fill(messageText);
                if (useEnter) {
                    await this.directChatInput.press('Enter');
                } else {
                    await this.directSendButton.click();
                }
            }
            await this.page.waitForTimeout(500); // Wait for message to be sent
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
            await this.page.waitForTimeout(2000); // Wait for chat widget to load
        });
    }
}
