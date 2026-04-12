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

test.describe('Smartsupp | Mira AI - Full Lifecycle E2E', { tag: ['@scenario', '@mira-ai', '@e2e'] }, () => {
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

        await allure.step('Configure behavior sliders: tone, talkativeness, confidence and emoji', async () => {
            await chatBotPage.behaviorTab.click();
            await chatBotPage.editBehaviorSlider('tone', 2);
            await chatBotPage.editBehaviorSlider('talkativeness', 1);
            await chatBotPage.editBehaviorSlider('confidence', 0);
            await chatBotPage.editBehaviorSlider('emoji', 1);
            await chatBotPage.saveAndPublish();
        });

        await allure.step('Re-open editor and verify behavior slider values are persisted', async () => {
            await chatBotPage.navigate();
            await chatBotPage.openBotEditor(0);
            await chatBotPage.behaviorTab.click();
            await chatBotPage.verifyBehaviorSlider('tone', 2);
            await chatBotPage.verifyBehaviorSlider('talkativeness', 1);
            await chatBotPage.verifyBehaviorSlider('confidence', 0);
            await chatBotPage.verifyBehaviorSlider('emoji', 1);
        });

        await allure.step('Configure handover: set to "Never handover to an operator" and publish', async () => {
            await chatBotPage.navigate();
            await chatBotPage.openBotEditor(0);
            await chatBotPage.skillsTabButton.click();
            await chatBotPage.openSkill('Handover to an operator');
            await chatBotPage.selectHandoverOption('Never handover to an operator');
            await chatBotPage.saveAndPublish();
        });

        await allure.step('Verify handover option is persisted', async () => {
            await chatBotPage.navigate();
            await chatBotPage.openBotEditor(0);
            await chatBotPage.skillsTabButton.click();
            await chatBotPage.openSkill('Handover to an operator');
            await chatBotPage.verifyHandoverOption('Never handover to an operator');
        });

        await allure.step('Change welcome message language to Czech and publish', async () => {
            await chatBotPage.navigate();
            await chatBotPage.openBotEditor(0);
            await chatBotPage.clickWelcomeMessageTab();
            await chatBotPage.clickWelcomeMessageDropdownIndicator();
            await page.locator('#react-select-2-option-1').click();
            await chatBotPage.saveAndPublish();
        });

        await allure.step('Re-open editor and verify welcome message language is persisted', async () => {
            await chatBotPage.navigate();
            await chatBotPage.openBotEditor(0);
            await chatBotPage.clickWelcomeMessageTab();
            await chatBotPage.verifyWelcomeMessageLanguage('CS - Čeština');
        });

        await allure.step('Toggle the agent OFF and verify it is disabled', async () => {
            await chatBotPage.navigate();
            await chatBotPage.toggleBotSwitch('off', 0);
            await chatBotPage.verifyBotDisabled(0);
        });

        await allure.step('Toggle the agent back ON and verify it is enabled', async () => {
            await chatBotPage.toggleBotSwitch('on', 0);
            await chatBotPage.verifyBotEnabled(0);
        });

        await allure.step('Delete the Mira AI agent', async () => {
            await chatBotPage.navigate();
            await chatBotPage.deleteBot(0);
        });

        await allure.step('Verify no agents remain', async () => {
            await chatBotPage.verifyNoAgents();
        });



    });
});
