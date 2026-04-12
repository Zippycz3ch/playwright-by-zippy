import { test, Page } from '@playwright/test';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { ConversationPage } from '../../interface/ui/conversationPage';
import { ChatWidgetPage } from '../../interface/ui/chatWidgetPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';
import * as allure from 'allure-js-commons';

test.describe('Smartsupp | Live Chat - Bidirectional Communication', { tag: ['@scenario', '@chat', '@e2e'] }, () => {
    test('should allow operator to reply and visitor to receive the response', async ({ page, context }) => {
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

        const operatorMessage = `Hello! This is operator response - ${Date.now()}`;
        await conversationPage.sendOperatorMessage(operatorMessage);

        await allure.step('Switch to visitor page to verify operator response', async () => {
            await visitorPage.bringToFront();
        });

        await chatWidget.verifyMessageReceived(operatorMessage);

        await visitorPage.close();
        await page.close();
    });
});

