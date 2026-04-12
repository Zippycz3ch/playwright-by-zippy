import { Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import path from 'path';

export class ChatWidgetPage {
    constructor(private page: Page) { }

    get messengerFrame() {
        return this.page.frameLocator('iframe[title="Smartsupp widget messenger"]');
    }

    get messageInput() {
        return this.messengerFrame.getByTestId('textarea');
    }

    get attachmentButton() {
        return this.messengerFrame.getByTestId('buttonAttachment');
    }

    get filePreview() {
        return this.messengerFrame.getByTestId('textareaPreviewFile');
    }

    getOperatorMessage(messageText: string) {
        return this.messengerFrame.getByText(new RegExp(messageText)).first();
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

    async verifyMessageReceived(messageText: string) {
        await allure.step(`Verify message "${messageText}" was received from operator`, async () => {
            await expect(this.getOperatorMessage(messageText)).toBeVisible({ timeout: 15000 });
        });
    }
}
