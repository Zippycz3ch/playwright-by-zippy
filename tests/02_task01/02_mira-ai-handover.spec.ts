import { test } from '@playwright/test';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';
import * as allure from 'allure-js-commons';

// This test expects an existing Mira AI agent to be present
// and the default handover option to be "Never handover to an operator"


test.describe('Smartsupp | Mira AI - Agent Handover Settings', { tag: ['@scenario', '@mira-ai', '@handover'] }, () => {
    test('should toggle Mira AI agent handover option and verify change persists after publish', async ({ page }) => {
        test.setTimeout(120_000);

        const chatBotPage = new AiChatbotsPage(page);
        await loginAndVerifyDashboard(page);

        await chatBotPage.navigate();
        await chatBotPage.openBotEditor();
        await chatBotPage.skillsTabButton.click();
        await chatBotPage.openSkill('Handover to an operator');

        await allure.step('Switch to "Never handover to an operator"', async () => {
            await chatBotPage.selectHandoverOption('Never handover to an operator');
            await chatBotPage.saveAndPublish();
        });

        await chatBotPage.navigate();
        await chatBotPage.openBotEditor();
        await chatBotPage.skillsTabButton.click();
        await chatBotPage.openSkill('Handover to an operator');
        await chatBotPage.verifyHandoverOption('Never handover to an operator');

        await allure.step('Switch to "Handover when convenient or on demand"', async () => {
            await chatBotPage.selectHandoverOption('Handover when convenient or on demand');
            await chatBotPage.saveAndPublish();
        });

        await chatBotPage.navigate();
        await chatBotPage.openBotEditor();
        await chatBotPage.skillsTabButton.click();
        await chatBotPage.openSkill('Handover to an operator');
        await chatBotPage.verifyHandoverOption('Handover when convenient or on demand');

        await page.close();
    });
});
