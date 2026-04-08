import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { ConversationPage } from '../../interface/ui/conversationPage';
import { ChatWidgetPage } from '../../interface/ui/chatWidgetPage';
import * as allure from 'allure-js-commons';

/**
 * Extended test: Visitor sends message, Operator opens conversation and responds
 */
test.describe('Bidirectional Chat Communication', () => {
    test('Visitor sends message, Operator responds', async ({ page: operatorPage, context }) => {
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

        const testMessage = `Test message from visitor - ${Date.now()}`;
        await allure.step('Visitor sends message', async () => {
            const chatWidget = new ChatWidgetPage(visitorPage);
            await chatWidget.sendMessage(testMessage);
            console.log(`✅ Visitor sent: "${testMessage}"`);
        });

        await allure.step('Verify message appears in operator inbox', async () => {
            await operatorPage.bringToFront();
            await conversationPage.switchToNewConversations();
            await conversationPage.expectMessageInList(testMessage);
            console.log(`✅ Operator sees: "${testMessage}"`);
        });

        await allure.step('Operator opens the conversation', async () => {
            await conversationPage.openConversationByText(testMessage);
        });

        const operatorMessage = `Hello! This is operator response - ${Date.now()}`;
        await allure.step('Operator verifies message and sends response', async () => {
            const messageInDetail = operatorPage.getByText(testMessage).last();
            await expect(messageInDetail).toBeVisible({ timeout: 5000 });
            await conversationPage.sendOperatorMessage(operatorMessage);
            console.log(`✅ Operator sent: "${operatorMessage}"`);
        });

        await allure.step('Verify visitor receives operator response', async () => {
            await visitorPage.bringToFront();
            await visitorPage.waitForTimeout(3000);
            const chatWidget = new ChatWidgetPage(visitorPage);
            await chatWidget.verifyMessageReceived('Hello! This is operator response');
            console.log('✅ Visitor received operator response');
            await visitorPage.close();
            await operatorPage.close();
        });
    });
});
