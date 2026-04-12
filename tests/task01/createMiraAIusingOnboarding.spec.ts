import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { AIAutomationsPage } from '../../interface/ui/aiAutomationsPage';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';

test.describe('AI Bot Management - Complete Flow', { tag: ['@scenario', '@ai-bot'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let aiPage: AIAutomationsPage;
    let chatBotPage: AiChatbotsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        aiPage = new AIAutomationsPage(page);
        chatBotPage = new AiChatbotsPage(page);

        // Login to Smartsupp
        await loginPage.navigate();
        await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
        await dashboardPage.verifyDashboardPageLoaded();

    });

    test('Create and Publish AI Bot', async ({ page }) => {
        test.setTimeout(120_000);
        await allure.severity(Severity.CRITICAL);
        let createdBotName = '';

        await allure.step('Step 1: Create AI Bot via Onboarding', async () => {
            await aiPage.navigateToOnboarding();
            createdBotName = await aiPage.completeOnboarding('example.com');
            await chatBotPage.publishNewBot();
        });

        await allure.step('Step 2: Verify bot exists in list and name matches in editor', async () => {
            await chatBotPage.navigate();
            await expect(page.getByTestId('chatbot-card')).toHaveCount(1, { timeout: 15_000 });
            await chatBotPage.openBotEditor(0);
            await expect(chatBotPage.botDisplayName).toHaveText(createdBotName);
        });
    });
});
