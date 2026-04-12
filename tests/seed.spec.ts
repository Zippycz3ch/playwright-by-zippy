import { test } from '@playwright/test';
import { LoginPage } from '../interface/ui/loginpage';
import { DashboardPage } from '../interface/ui/dashboardPage';
import { AiChatbotsPage } from '../interface/ui/aiChatbotsPage';
import { loginAndVerifyDashboard } from '../interface/ui/helpers/loginHelper';

test.describe('Seed - AI Chatbots Create New Bot', () => {
  test('seed', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const aiChatbotsPage = new AiChatbotsPage(page);

    await loginAndVerifyDashboard(page);

    await aiChatbotsPage.navigate();
    await aiChatbotsPage.clickAddNew();

    // Pause here to inspect the creation wizard
    await page.pause();
  });
});
