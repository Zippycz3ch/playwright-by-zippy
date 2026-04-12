import { test } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';

// This test expects an existing Mira AI agent to be present

test.describe('Smartsupp | Mira AI - Toggle Agent On/Off from Dashboard', { tag: ['@scenario', '@mira-ai', '@toggle', '@dashboard'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let chatBotPage: AiChatbotsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        chatBotPage = new AiChatbotsPage(page);

        await loginAndVerifyDashboard(page);
    });

    test('should toggle Mira AI agent off and back on from the dashboard', async () => {
        test.setTimeout(60_000);
        await allure.severity(Severity.CRITICAL);

        await allure.step('Navigate to AI Assistants and ensure agent is enabled', async () => {
            await chatBotPage.navigate();
            await chatBotPage.toggleBotSwitch('on', 0);
            await chatBotPage.verifyBotEnabled(0);
        });

        await allure.step('Toggle the agent OFF and verify it is disabled', async () => {
            await chatBotPage.toggleBotSwitch('off', 0);
            await chatBotPage.verifyBotDisabled(0);
        });

        await allure.step('Toggle the agent back ON and verify it is enabled', async () => {
            await chatBotPage.toggleBotSwitch('on', 0);
            await chatBotPage.verifyBotEnabled(0);
        });
    });
});

