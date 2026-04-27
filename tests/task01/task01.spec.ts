import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { AIAutomationsPage } from '../../interface/ui/aiAutomationsPage';
import * as allure from 'allure-js-commons';

test.describe('AI Bot Management - Complete Flow', { tag: ['@scenario', '@ai-bot'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let aiPage: AIAutomationsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        aiPage = new AIAutomationsPage(page);

        // Login to Smartsupp
        await loginPage.navigate();
        await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
    });

    test('Onboarding Smartsupp', async ({ page, context }) => {



        await allure.step('Step 1: Onboarding Smartsupp', async () => {

        });

        await allure.step('Step 1: Create AI Bot via Onboarding', async () => {
            // Wait for automatic redirect to onboarding (triggered when no bots exist)
            await aiPage.waitForOnboardingPage();

            // Complete onboarding
            await aiPage.completeOnboarding('example.com');

            // Verify bot was created
            // await aiPage.verifyBotExists();
        });
    });
});
