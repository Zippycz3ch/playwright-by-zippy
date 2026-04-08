import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import * as allure from 'allure-js-commons';

/**
 * Simple test: Using Smartsupp's Test Conversation feature
 */
test.describe('Basic Chat Communication', () => {
    test('Send test message using Smartsupp Test Conversation', async ({ page, context }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // Step 1: Login and navigate to inbox
        await allure.step('Operator logs in and opens inbox', async () => {
            await loginPage.navigate();
            await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
            await dashboardPage.verifyDashboardPageLoaded();

            // Navigate to conversations/inbox
            await dashboardPage.inboxNav.click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            console.log('✅ Operator is in Inbox/Conversations');
        });

        // Step 2: Click on Agents filter
        await allure.step('Click Agents filter', async () => {
            const agentsButton = page.getByText('Agents').first();
            await agentsButton.click();
            await page.waitForTimeout(1000);

            console.log('✅ Clicked Agents filter');
        });

        // Step 3: Click on "Discover how the live chat works" article
        await allure.step('Click Discover how the live chat works', async () => {
            const discoverArticle = page.locator('text=Discover how the live chat works');
            await discoverArticle.click();
            await page.waitForTimeout(1000);

            console.log('✅ Clicked Discover article');
        });

        // Step 4: Click "Try a Test Conversation" button and wait for new tab
        await allure.step('Click Try a Test Conversation and open visitor chat', async () => {
            // Set up listener for new page BEFORE clicking
            const pagePromise = context.waitForEvent('page');

            const testConversationButton = page.getByRole('button', { name: 'Try a Test Conversation' });
            await testConversationButton.click();

            console.log('✅ Clicked Try a Test Conversation');

            // Wait for the new page to open
            const visitorPage = await pagePromise;
            await visitorPage.waitForLoadState('networkidle');
            await visitorPage.waitForTimeout(2000);

            console.log('✅ Visitor chat window opened');
            console.log('Visitor page URL:', visitorPage.url());

            // Send test message from visitor
            const testMessage = `Test message from visitor - ${Date.now()}`;

            // Find message input in visitor chat iframe
            const chatFrame = visitorPage.frameLocator('iframe[title="Smartsupp widget messenger"]');
            const messageInput = chatFrame.getByTestId('textarea');
            await messageInput.waitFor({ timeout: 10000 });
            await messageInput.fill(testMessage);
            await messageInput.press('Enter');

            console.log(`✅ Visitor sent: "${testMessage}"`);
            await visitorPage.waitForTimeout(2000);

            // Switch back to operator page and verify message
            await page.bringToFront();
            await page.waitForTimeout(2000);

            // Close any popup that might be blocking
            await page.keyboard.press('Escape');
            await page.waitForTimeout(500);

            // Click on "New" filter to see new conversations (we're currently in Resolved view)
            const newFilterButton = page.getByRole('button', { name: /📬 New/i });
            await newFilterButton.click();
            await page.waitForTimeout(2000);

            console.log('✅ Clicked New filter to see new conversations');

            // Look for the test message in the conversation list
            const messageInConversation = page.getByText(testMessage);
            await expect(messageInConversation).toBeVisible({ timeout: 10000 });

            console.log(`✅ Operator received: "${testMessage}"`);

            // Click on the conversation to open it
            await messageInConversation.click();
            await page.waitForTimeout(2000);

            console.log('✅ Clicked on conversation to open detail view');

            // Verify message is visible in conversation detail view
            const messageInDetail = page.getByText(testMessage).last();
            await expect(messageInDetail).toBeVisible({ timeout: 5000 });

            console.log('✅ Message verified in conversation detail view');

            // Close all browser tabs
            await visitorPage.close();
            await page.close();
            console.log('✅ Closed all browser tabs');
        });
    });
});
