import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { ConversationPage } from '../../interface/ui/conversationPage';
import { ChatWidgetPage } from '../../interface/ui/chatWidgetPage';
import * as allure from 'allure-js-commons';

/**
 * Test: Inbox closed conversation filters - Search interaction
 */
test.describe('Inbox Closed Conversation Filters', () => {
    test('Click on search input field', async ({ page, context }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const conversationPage = new ConversationPage(page);

        await allure.step('Operator logs in and opens inbox', async () => {
            await loginPage.navigate();
            await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
            await dashboardPage.verifyDashboardPageLoaded();
            await dashboardPage.openInbox();
            console.log('✅ Inbox opened');
        });

        await allure.step('Click on search input field', async () => {
            const searchInput = page.locator('[data-testid="closed-conversation-filters-search"]');
            await searchInput.waitFor({ timeout: 10000 });
            await searchInput.click();
            console.log('✅ Search input field clicked');
        });

        await allure.step('Cleanup: Close page', async () => {
            await page.waitForTimeout(2000);
            await page.close();
            console.log('✅ Test completed successfully');
        });
    });
});
