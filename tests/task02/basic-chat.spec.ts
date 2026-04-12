import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { ConversationPage } from '../../interface/ui/conversationPage';
import { ChatWidgetPage } from '../../interface/ui/chatWidgetPage';
import * as allure from 'allure-js-commons';

/**
 * Simple test: Using Smartsupp's Test Conversation feature
 * This requires no Mira AI agents to be enabled,
 * as it uses a direct visitor-to-operator communication
 */
test.describe('Basic Chat Communication', () => {
    test('Send test message using Smartsupp Test Conversation', async ({ page, context }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const conversationPage = new ConversationPage(page);

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

        await allure.step('Operator sees message in inbox', async () => {
            await page.bringToFront();
            await conversationPage.switchToNewConversations();
            await conversationPage.expectMessageInList(testMessage);
            await conversationPage.openConversationByText(testMessage);
            const messageInDetail = page.getByText(testMessage).last();
            await expect(messageInDetail).toBeVisible({ timeout: 5000 });
            console.log(`✅ Operator verified: "${testMessage}"`);
            await visitorPage.close();
            await page.close();
        });
    });
});
