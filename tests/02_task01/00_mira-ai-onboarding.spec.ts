import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { AIAutomationsPage } from '../../interface/ui/aiAutomationsPage';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';

// This test expects that no Mira AI or source is added, so the onboarding page is presented after login
// and that the user is already onboarded to Smartsupp

test.describe('Smartsupp | Mira AI - Onboarding & Agent Creation', { tag: ['@scenario', '@mira-ai', '@onboarding'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let aiPage: AIAutomationsPage;
    let chatBotPage: AiChatbotsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        aiPage = new AIAutomationsPage(page);
        chatBotPage = new AiChatbotsPage(page);

        await loginAndVerifyDashboard(page);
    });

    test('should create and publish a new Mira AI agent via onboarding', async ({ page }) => {
        test.setTimeout(60_000);
        await allure.severity(Severity.CRITICAL);
        let createdAgentName = '';

        await allure.step('Create Mira AI agent via onboarding flow', async () => {
            await aiPage.navigateToOnboarding();
            createdAgentName = await aiPage.completeOnboarding('example.com');
            await chatBotPage.publishNewBot();
        });

        await allure.step('Verify created Mira AI agent is visible in the list and name matches', async () => {
            await chatBotPage.navigate();
            await expect(page.getByTestId('chatbot-card')).toHaveCount(1, { timeout: 15_000 });
            await chatBotPage.openBotEditor(0);
            await expect(chatBotPage.botDisplayName).toHaveText(createdAgentName);
        });
    });
});
