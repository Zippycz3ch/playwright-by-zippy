import { test, Page } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { ConversationPage } from '../../interface/ui/conversationPage';
import { ChatWidgetPage } from '../../interface/ui/chatWidgetPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';

test.describe('Smartsupp | Live Chat - Visitor Sends Message', { tag: ['@scenario', '@chat', '@smoke'] }, () => {
    test('should receive visitor message in operator inbox', async ({ page, context }) => {
        const dashboardPage = new DashboardPage(page);
        const conversationPage = new ConversationPage(page);

        await loginAndVerifyDashboard(page);
        await dashboardPage.openInbox();
        await dashboardPage.openDiscoverLiveChatArticle();

        const visitorPage: Page = await dashboardPage.startTestConversation(context);
        const testMessage = `Test message from visitor - ${Date.now()}`;

        const chatWidget = new ChatWidgetPage(visitorPage);
        await chatWidget.sendMessage(testMessage);

        await allure.step('Switch to operator page to handle incoming conversation', async () => {
            await page.bringToFront();
        });

        await conversationPage.switchToNewConversations();
        await conversationPage.expectMessageInList(testMessage);
        await conversationPage.openConversationByText(testMessage);
        await conversationPage.verifyMessageInConversationDetail(testMessage);

        await visitorPage.close();
        await page.close();
    });
});
