import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { ConversationPage } from '../../interface/ui/conversationPage';
import { ChatWidgetPage } from '../../interface/ui/chatWidgetPage';
import * as allure from 'allure-js-commons';
import path from 'path';

/**
 * File Upload test: Visitor sends a file attachment, Operator receives it
 */
test.describe('File Upload in Chat', () => {
    test('Visitor sends file attachment to Operator', async ({ page: operatorPage, context }) => {
        test.setTimeout(90000);

        const loginPage = new LoginPage(operatorPage);
        const dashboardPage = new DashboardPage(operatorPage);
        const conversationPage = new ConversationPage(operatorPage);

        await allure.step('Operator logs in and opens inbox', async () => {
            await loginPage.navigate();
            await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
            await dashboardPage.verifyDashboardPageLoaded();
            await dashboardPage.openInbox();
        });

        await allure.step('Open Discover live chat article', async () => {
            await dashboardPage.openDiscoverLiveChatArticle();
        });

        let visitorPage!: Page;
        await allure.step('Click Try a Test Conversation and open visitor chat', async () => {
            visitorPage = await dashboardPage.startTestConversation(context);
            console.log('✅ Visitor chat window opened:', visitorPage.url());
        });

        const chatWidget = new ChatWidgetPage(visitorPage);
        const testMessage = `Test message with file attachment - ${Date.now()}`;

        await allure.step('Visitor sends message', async () => {
            await chatWidget.sendMessage(testMessage);
            console.log(`✅ Visitor sent: "${testMessage}"`);
        });

        await allure.step('Visitor uploads file attachment', async () => {
            const filePath = path.join(__dirname, 'file.txt');
            await chatWidget.uploadFile(filePath);
            await chatWidget.expectFilePreviewVisible();
            await chatWidget.sendPendingAttachment();
            console.log('✅ File sent to operator');
        });

        await allure.step('Verify message appears in operator inbox', async () => {
            await operatorPage.bringToFront();
            await conversationPage.switchToNewConversations();
            const fileConversation = operatorPage.getByRole('button', { name: /file\.txt/i }).first();
            await expect(fileConversation).toBeVisible({ timeout: 10000 });
            console.log('✅ Operator sees uploaded file conversation');
        });

        await allure.step('Operator opens the conversation', async () => {
            const conversationItem = operatorPage.getByRole('button', { name: /file\.txt/i }).first();
            await conversationItem.click();
            await operatorPage.waitForTimeout(2000);
        });

        await allure.step('Operator sees file attachment', async () => {
            const fileAttachment = operatorPage.getByRole('link', { name: /file\.txt/i }).first();
            await expect(fileAttachment).toBeVisible({ timeout: 10000 });
            console.log('✅ Operator sees file attachment: file.txt');
            await visitorPage.close();
            await operatorPage.close();
        });
    });
});
