import { test } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { AiChatbotsPage } from '../../interface/ui/aiChatbotsPage';

// This tests expect already existing Mira AI

test.describe('AI Bot Management - Complete Flow', { tag: ['@scenario', '@ai-bot'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let chatBotPage: AiChatbotsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        chatBotPage = new AiChatbotsPage(page);

        await loginPage.navigate();
        await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
        await dashboardPage.verifyDashboardPageLoaded();
    });

    test('Edit welcome message language', async ({ page }) => {
        test.setTimeout(120_000);
        await allure.severity(Severity.CRITICAL);

        await allure.step('Edit lang to CZ', async () => {
            await chatBotPage.navigate();
            await chatBotPage.openBotEditor(0);
            await chatBotPage.clickWelcomeMessageTab();
            await chatBotPage.clickWelcomeMessageDropdownIndicator();
            await page.locator('#react-select-2-option-1').click();
            await chatBotPage.saveAndPublish();
        });
    });
});
