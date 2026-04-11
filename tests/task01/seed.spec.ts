import { test } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';

test.describe('Seed - AI Chatbots Create New Bot', () => {
  test('seed', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const aiChatbotsPage = new AiChatbotsPage(page);

    await loginPage.navigate();
    await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
    await dashboardPage.verifyDashboardPageLoaded();

    await aiChatbotsPage.navigate();
    await aiChatbotsPage.clickAddNew();

    // Pause here to inspect the creation wizard
    await page.pause();
  });
});
