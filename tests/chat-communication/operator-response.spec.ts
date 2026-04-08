import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import * as allure from 'allure-js-commons';

/**
 * Extended test: Visitor sends message, Operator opens conversation and responds
 */
test.describe('Bidirectional Chat Communication', () => {
    test('Visitor sends message, Operator responds', async ({ page: operatorPage, context }) => {
        const loginPage = new LoginPage(operatorPage);
        const dashboardPage = new DashboardPage(operatorPage);

        // Step 1: Login and navigate to inbox
        await allure.step('Operator logs in and opens inbox', async () => {
            await loginPage.navigate();
            await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
            await dashboardPage.verifyDashboardPageLoaded();

            // Navigate to conversations/inbox
            await dashboardPage.inboxNav.click();
            await operatorPage.waitForLoadState('networkidle');
            await operatorPage.waitForTimeout(2000);

            console.log('✅ Operator is in Inbox/Conversations');
        });

        // Step 2: Click on "Discover how the live chat works" article
        await allure.step('Click Discover how the live chat works', async () => {
            const discoverArticle = operatorPage.getByRole('heading', { name: 'Discover how the live chat' });
            await discoverArticle.click();
            await operatorPage.waitForTimeout(1000);

            console.log('✅ Clicked Discover article');
        });

        // Step 3: Click "Try a Test Conversation" button and wait for new tab
        let visitorPage: Page;
        let testMessage: string;

        await allure.step('Click Try a Test Conversation and open visitor chat', async () => {
            // Set up listener for new page BEFORE clicking
            const pagePromise = context.waitForEvent('page');

            const testConversationButton = operatorPage.getByRole('button', { name: 'Try a Test Conversation' });
            await testConversationButton.click();

            console.log('✅ Clicked Try a Test Conversation');

            // Wait for the new page to open
            visitorPage = await pagePromise;
            await visitorPage.waitForLoadState('networkidle');
            await visitorPage.waitForTimeout(2000);

            console.log('✅ Visitor chat window opened');
            console.log('Visitor page URL:', visitorPage.url());
        });

        // Step 4: Send message from visitor
        await allure.step('Visitor sends message', async () => {
            testMessage = `Test message from visitor - ${Date.now()}`;

            // Find message input in visitor chat iframe
            const chatFrame = visitorPage.frameLocator('iframe[title="Smartsupp widget messenger"]');
            const messageInput = chatFrame.getByTestId('textarea');
            await messageInput.waitFor({ timeout: 10000 });
            await messageInput.fill(testMessage);
            await messageInput.press('Enter');

            console.log(`✅ Visitor sent: "${testMessage}"`);
            await visitorPage.waitForTimeout(2000);
        });

        // Step 5: Switch back to operator and verify message in inbox
        await allure.step('Verify message appears in operator inbox', async () => {
            await operatorPage.bringToFront();
            await operatorPage.waitForTimeout(2000);

            // Close any popup that might be blocking
            await operatorPage.keyboard.press('Escape');
            await operatorPage.waitForTimeout(500);

            // Click on "New" filter to see new conversations (we're currently in Resolved view)
            const newFilterButton = operatorPage.getByRole('button', { name: /📬 New/i });
            await newFilterButton.click();
            await operatorPage.waitForTimeout(2000);

            console.log('✅ Clicked New filter to see new conversations');

            // Look for the test message in the conversation list
            const messageInConversation = operatorPage.getByText(testMessage);
            await expect(messageInConversation).toBeVisible({ timeout: 10000 });


            console.log(`✅ Operator sees message in inbox: "${testMessage}"`);
        });

        // Step 6: Click on the conversation to open it
        await allure.step('Operator opens the conversation', async () => {
            // Click on the conversation item containing our test message
            const conversationItem = operatorPage.getByText(testMessage);
            await conversationItem.click();
            await operatorPage.waitForTimeout(2000);

            console.log('✅ Operator opened the conversation');
        });

        // Step 7: Verify message in conversation detail and send response
        await allure.step('Operator verifies message and sends response', async () => {
            // Verify the message is visible in the conversation details
            // Use .last() to get the message in the detail view (not the inbox list)
            const messageInDetail = operatorPage.getByText(testMessage).last();
            await expect(messageInDetail).toBeVisible({ timeout: 5000 });

            console.log('✅ Message verified in conversation detail');

            // Send operator response
            const operatorMessage = `Hello! This is operator response - ${Date.now()}`;

            // Find the message input for operator (using tiptap class selector discovered via MCP)
            const operatorInput = operatorPage.locator('.tiptap');

            await operatorInput.waitFor({ timeout: 10000 });
            await operatorInput.fill(operatorMessage);
            await operatorInput.press('Enter');

            console.log(`✅ Operator sent: "${operatorMessage}"`);
            await operatorPage.waitForTimeout(2000);
        });

        // Step 8: Verify visitor receives the response
        await allure.step('Verify visitor receives operator response', async () => {
            await visitorPage.bringToFront();
            await visitorPage.waitForTimeout(3000);

            const operatorMessage = `Hello! This is operator response`;

            // Look for operator's response in visitor chat
            const chatFrame = visitorPage.frameLocator('iframe[title="Smartsupp widget messenger"]');
            const operatorResponse = chatFrame.getByText(new RegExp(operatorMessage));
            await expect(operatorResponse).toBeVisible({ timeout: 10000 });

            console.log('✅ Visitor received operator response');

            // Close all browser tabs
            await visitorPage.close();
            await operatorPage.close();
            console.log('✅ Closed all browser tabs');
        });
    });
});
