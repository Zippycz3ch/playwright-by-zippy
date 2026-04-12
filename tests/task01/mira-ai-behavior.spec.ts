import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { AIAutomationsPage } from '../../interface/ui/aiAutomationsPage';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';

// This tests expect already existing Mira AI

test.describe('Smartsupp | Mira AI - Agent Behavior Configuration', { tag: ['@scenario', '@mira-ai', '@settings'] }, () => {
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
        await loginAndVerifyDashboard(page);

    });

    test('should configure Mira AI agent behavior sliders and publish changes', async ({ page }) => {
        test.setTimeout(120_000);
        await allure.severity(Severity.CRITICAL);


        await allure.step('Adjust behavior sliders: tone, talkativeness, confidence and emoji', async () => {
            await chatBotPage.navigate();
            await chatBotPage.openBotEditor();
            await chatBotPage.behaviorTab.click();
            await chatBotPage.editBehaviorSlider('tone', 2);
            await chatBotPage.editBehaviorSlider('talkativeness', 1);
            await chatBotPage.editBehaviorSlider('confidence', 0);
            await chatBotPage.editBehaviorSlider('emoji', 1);

            await chatBotPage.saveAndPublish();
        });
    });
});
