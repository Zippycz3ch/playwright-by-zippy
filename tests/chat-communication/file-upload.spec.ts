import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
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

        // Step 2: Click on Agents filter
        await allure.step('Click Agents filter', async () => {
            const agentsButton = operatorPage.getByText('Agents').first();
            await agentsButton.click();
            await operatorPage.waitForTimeout(1000);

            console.log('✅ Clicked Agents filter');
        });

        // Step 3: Click on "Discover how the live chat works" article
        await allure.step('Click Discover how the live chat works', async () => {
            const discoverArticle = operatorPage.locator('text=Discover how the live chat works');
            await discoverArticle.click();
            await operatorPage.waitForTimeout(1000);

            console.log('✅ Clicked Discover article');
        });

        // Step 4: Click "Try a Test Conversation" button and wait for new tab
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

        // Step 5: Send message from visitor
        await allure.step('Visitor sends message', async () => {
            testMessage = `Test message with file attachment - ${Date.now()}`;

            // Find message input in visitor chat iframe
            const chatFrame = visitorPage.frameLocator('iframe[title="Smartsupp widget messenger"]');
            const messageInput = chatFrame.getByTestId('textarea');
            await messageInput.waitFor({ timeout: 10000 });
            await messageInput.fill(testMessage);
            await messageInput.press('Enter');

            const attachmentButton = chatFrame.getByTestId('buttonAttachment');
            await expect(attachmentButton).toBeVisible({ timeout: 10000 });

            console.log(`✅ Visitor sent: "${testMessage}"`);
            await visitorPage.waitForTimeout(2000);
        });

        // Step 6: Upload file attachment
        await allure.step('Visitor uploads file attachment', async () => {
            const chatFrame = visitorPage.frameLocator('iframe[title="Smartsupp widget messenger"]');

            // Find and click the attachment button (using correct testid discovered via MCP)
            const attachmentButton = chatFrame.getByTestId('buttonAttachment');
            await attachmentButton.waitFor({ timeout: 10000 });

            // Get the file path
            const filePath = path.join(__dirname, 'file.txt');

            // Set up file chooser listener before clicking
            const fileChooserPromise = visitorPage.waitForEvent('filechooser');
            await attachmentButton.click();

            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(filePath);

            console.log('✅ Visitor selected file: file.txt');

            // Wait for file preview to appear
            await visitorPage.waitForTimeout(2000);

            // Verify file preview appears in visitor's chat view
            const filePreview = chatFrame.getByTestId('textareaPreviewFile');
            await expect(filePreview).toBeVisible({ timeout: 10000 });

            console.log('✅ File preview visible in visitor chat');

            // Wait for UI to update after file selection
            await visitorPage.waitForTimeout(1000);

            // Send the file by pressing Enter in the message input
            const messageInput = chatFrame.getByTestId('textarea');

            // Click on the textarea to ensure focus
            await messageInput.click();
            await visitorPage.waitForTimeout(500);

            // Press Enter to send the file
            await visitorPage.keyboard.press('Enter');

            console.log('✅ File sent to operator via Enter key');
            await visitorPage.waitForTimeout(3000);
        });

        // Step 7: Switch back to operator and verify message in inbox
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

            // The newest conversation preview shows the uploaded file name
            const fileConversation = operatorPage.getByRole('button', { name: /file\.txt/i }).first();
            await expect(fileConversation).toBeVisible({ timeout: 10000 });

            console.log('✅ Operator sees uploaded file conversation in inbox');
        });

        // Step 8: Click on the conversation to open it
        await allure.step('Operator opens the conversation', async () => {
            const conversationItem = operatorPage.getByRole('button', { name: /file\.txt/i }).first();
            await conversationItem.click();
            await operatorPage.waitForTimeout(2000);

            console.log('✅ Operator opened the conversation');
        });

        // Step 9: Verify file attachment is visible in conversation
        await allure.step('Operator sees file attachment', async () => {
            // Look for file attachment - must contain "file.txt"
            const fileAttachment = operatorPage.getByRole('link', { name: /file\.txt/i }).first();

            // Strict check - file.txt must be visible
            await expect(fileAttachment).toBeVisible({ timeout: 10000 });

            console.log('✅ Operator sees file attachment: file.txt');

            // Close all browser tabs
            await visitorPage.close();
            await operatorPage.close();
            console.log('✅ Closed all browser tabs');
        });
    });
});
