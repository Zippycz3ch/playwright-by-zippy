import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';

// This test expects an existing Mira AI agent to be present

test.describe('Smartsupp | Mira AI - Agent Deletion', { tag: ['@scenario', '@mira-ai', '@delete'] }, () => {
    test('should delete the existing Mira AI agent', async ({ page }) => {
        test.setTimeout(60_000);
        await allure.severity(Severity.CRITICAL);

        const chatBotPage = new AiChatbotsPage(page);
        await loginAndVerifyDashboard(page);

        await allure.step('Navigate to AI Assistants and delete the existing Mira AI agent', async () => {
            await chatBotPage.navigate();
            await chatBotPage.deleteBot(0);
        });

        await chatBotPage.verifyNoAgents();
    });
});
