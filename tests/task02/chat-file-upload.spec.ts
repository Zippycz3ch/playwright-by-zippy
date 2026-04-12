import { test, Page } from '@playwright/test';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { ConversationPage } from '../../interface/ui/conversationPage';
import { ChatWidgetPage } from '../../interface/ui/chatWidgetPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';
import * as allure from 'allure-js-commons';
import path from 'path';

test.describe('Smartsupp | Live Chat - File Attachment', { tag: ['@scenario', '@chat', '@file-upload'] }, () => {
    test('should allow visitor to send a file attachment and operator should see it', async ({ page, context }) => {
        test.setTimeout(90000);

        const dashboardPage = new DashboardPage(page);
        const conversationPage = new ConversationPage(page);

        await loginAndVerifyDashboard(page);
        await dashboardPage.openInbox();
        await dashboardPage.openDiscoverLiveChatArticle();

        const visitorPage: Page = await dashboardPage.startTestConversation(context);
        const chatWidget = new ChatWidgetPage(visitorPage);
        const testMessage = `Test message with file attachment - ${Date.now()}`;

        await chatWidget.sendMessage(testMessage);

        const filePath = path.join(__dirname, 'file.txt');
        await chatWidget.uploadFile(filePath);
        await chatWidget.expectFilePreviewVisible();
        await chatWidget.sendPendingAttachment();

        await allure.step('Switch to operator page to handle incoming conversation', async () => {
            await page.bringToFront();
        });

        await conversationPage.switchToNewConversations();
        await conversationPage.verifyFileConversationInInbox('file.txt');
        await conversationPage.openConversationByFile('file.txt');
        await conversationPage.verifyFileAttachmentVisible('file.txt');

        await visitorPage.close();
        await page.close();
    });
});
