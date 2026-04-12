import { test } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { AIAutomationsPage } from '../../interface/ui/aiAutomationsPage';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';

// This test expects an existing Mira AI agent to be present with default
// setting of the behavior sliders from onboarding
// This will only work once, if you dont change the static slider values


test.describe('Smartsupp | Mira AI - Agent Behavior Configuration', { tag: ['@scenario', '@mira-ai', '@settings', '@behavior'] }, () => {
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

        // Slider values — update here to change the test configuration
        const tone = 2;
        const talkativeness = 1;
        const confidence = 0;
        const emoji = 1;

        await allure.step('Adjust behavior sliders: tone, talkativeness, confidence and emoji', async () => {
            await chatBotPage.navigate();
            await chatBotPage.openBotEditor();
            await chatBotPage.behaviorTab.click();
            await chatBotPage.editBehaviorSlider('tone', tone);
            await chatBotPage.editBehaviorSlider('talkativeness', talkativeness);
            await chatBotPage.editBehaviorSlider('confidence', confidence);
            await chatBotPage.editBehaviorSlider('emoji', emoji);

            await chatBotPage.saveAndPublish();
        });

        await allure.step('Re-open editor and verify behavior slider values are persisted', async () => {
            await chatBotPage.navigate();
            await chatBotPage.openBotEditor();
            await chatBotPage.behaviorTab.click();
            await chatBotPage.verifyBehaviorSlider('tone', tone);
            await chatBotPage.verifyBehaviorSlider('talkativeness', talkativeness);
            await chatBotPage.verifyBehaviorSlider('confidence', confidence);
            await chatBotPage.verifyBehaviorSlider('emoji', emoji);
        });
    });
});
