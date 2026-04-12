import { test } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';
import { loginAndVerifyDashboard } from '../../interface/ui/helpers/loginHelper';

// This test expects an existing Mira AI agent to be present

test.describe('Smartsupp | Mira AI - Agent Welcome Message Language', { tag: ['@scenario', '@mira-ai', '@settings', '@language'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let chatBotPage: AiChatbotsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        chatBotPage = new AiChatbotsPage(page);

        await loginAndVerifyDashboard(page);
    });

    test('should change Mira AI agent welcome message language to Czech and publish', async ({ page }) => {
        test.setTimeout(120_000);
        await allure.severity(Severity.CRITICAL);

        const expectedLanguage = 'CS - Čeština';

        await allure.step('Select Czech language from welcome message dropdown and publish', async () => {
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
            await chatBotPage.verifyWelcomeMessageLanguage(expectedLanguage);
        });
    });
});
