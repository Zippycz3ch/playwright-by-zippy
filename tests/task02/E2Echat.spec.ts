import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { ConversationPage } from '../../interface/ui/conversationPage';
import { ChatWidgetPage } from '../../interface/ui/chatWidgetPage';
import * as allure from 'allure-js-commons';
import path from 'path';

/**
 * Complex E2E test: Multiple messages, file upload, conversation resolution, rating
 */
test.describe('Complete E2E Chat Flow', () => {
    test.setTimeout(120_000);
    test('Exchange messages, upload file, and resolve conversation', async ({ page: operatorPage, context }) => {
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

        const operatorMessage1 = `Hello! How can I help you? - ${Date.now()}`;
        await allure.step('Operator verifies message and sends first response', async () => {
            const messageInDetail = operatorPage.getByText(testMessage).last();
            await expect(messageInDetail).toBeVisible({ timeout: 5000 });
            await conversationPage.sendOperatorMessage(operatorMessage1);
            console.log(`✅ Operator sent: "${operatorMessage1}"`);
        });

        await allure.step('Verify visitor receives first operator response', async () => {
            await visitorPage.bringToFront();
            await visitorPage.waitForTimeout(2000);
            const chatWidget = new ChatWidgetPage(visitorPage);
            await chatWidget.verifyMessageReceived('Hello! How can I help you?');
            console.log('✅ Visitor received first operator response');
        });

        const visitorMessage2 = `I need help with my order - ${Date.now()}`;
        await allure.step('Visitor sends second message', async () => {
            const chatWidget = new ChatWidgetPage(visitorPage);
            await chatWidget.sendMessage(visitorMessage2);
            console.log(`✅ Visitor sent: "${visitorMessage2}"`);
        });

        const operatorMessage2 = `Sure, I'll help you with that - ${Date.now()}`;
        await allure.step('Operator sends second response', async () => {
            await operatorPage.bringToFront();
            await operatorPage.waitForTimeout(1000);
            await conversationPage.sendOperatorMessage(operatorMessage2);
            console.log(`✅ Operator sent: "${operatorMessage2}"`);
        });

        await allure.step('Visitor uploads a file', async () => {
            await visitorPage.bringToFront();
            await visitorPage.waitForTimeout(2000);
            const chatWidget = new ChatWidgetPage(visitorPage);
            const filePath = path.resolve('tests/task02/file.txt');
            await chatWidget.uploadFile(filePath);
            console.log(`✅ Visitor uploaded file: ${filePath}`);
        });

        await allure.step('Visitor sends the file attachment', async () => {
            const chatWidget = new ChatWidgetPage(visitorPage);
            await chatWidget.expectFilePreviewVisible();
            await chatWidget.sendPendingAttachment();
            console.log('✅ File attachment sent');
        });

        await allure.step('Operator verifies file was received', async () => {
            await operatorPage.bringToFront();
            await operatorPage.waitForTimeout(3000);
            // Look for file attachment link
            const fileAttachment = operatorPage.getByRole('link', { name: /file\.txt/i }).first();
            await expect(fileAttachment).toBeVisible({ timeout: 10000 });
            console.log('✅ Operator sees file attachment');
        });

        const operatorMessage3 = `Thanks for the file, I will review it - ${Date.now()}`;
        await allure.step('Operator sends final response', async () => {
            await conversationPage.sendOperatorMessage(operatorMessage3);
            console.log(`✅ Operator sent: "${operatorMessage3}"`);
        });

        await allure.step('Operator resolves the conversation', async () => {
            await conversationPage.resolveConversation();
            console.log('✅ Conversation resolved');
            await conversationPage.verifyConversationResolved();
        });

        await allure.step('Visitor sees rating prompt after resolution', async () => {
            await visitorPage.bringToFront();
            await visitorPage.waitForTimeout(2000);
            const chatWidget = new ChatWidgetPage(visitorPage);
            await chatWidget.waitForRatingPrompt();
            console.log('✅ Rating prompt appeared for visitor');
        });

        await allure.step('Visitor clicks Rate button', async () => {
            const chatWidget = new ChatWidgetPage(visitorPage);
            await chatWidget.clickRateButton();
            console.log('✅ Visitor clicked Rate button');
        });

        await allure.step('Visitor rates the conversation as negative', async () => {
            const chatWidget = new ChatWidgetPage(visitorPage);
            await chatWidget.rateConversationNegative();
            console.log('✅ Visitor rated conversation as negative');
        });

        await allure.step('Verify rating was submitted', async () => {
            const chatWidget = new ChatWidgetPage(visitorPage);
            await chatWidget.verifyRatingSubmitted();
            console.log('✅ Rating submission confirmed');
        });

        await allure.step('Cleanup: Close pages', async () => {
            await visitorPage.close();
            await operatorPage.close();
            console.log('✅ Test completed successfully');
        });
    });
});
