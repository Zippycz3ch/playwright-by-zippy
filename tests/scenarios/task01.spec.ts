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
        await dashboardPage.verifyDashboardPageLoaded();
    });

    test('Create, Edit, and Delete AI Bot @AI @SCENARIO', async ({ page }) => {
        await allure.step('Step 1: Create AI Bot via Onboarding', async () => {
            // Navigate to AI Automations onboarding
            await aiPage.navigateToOnboarding();

            // Complete onboarding
            await aiPage.completeOnboarding('example.com');

            // Verify bot was created
            await aiPage.verifyBotExists();
        });

        await allure.step('Step 2: Edit 5 AI Bot Parameters', async () => {
            // Open bot for editing
            await aiPage.editBotButton.click();
            await page.waitForLoadState('networkidle');

            // Edit 5 parameters (adjust based on actual available fields)
            await aiPage.editBotParameter('botName', 'Updated AI Bot Name');
            await aiPage.editBotParameter('greeting', 'Hello! How can I help you today?');
            await aiPage.editBotParameter('language', 'cs');
            await aiPage.editBotParameter('responseStyle', 'friendly');
            await aiPage.editBotParameter('fallbackMessage', 'I apologize, I do not understand.');

            // Enable knowledge source (webscrape) for publishing
            await aiPage.enableKnowledgeSource();

            // Publish the bot
            await aiPage.publishBot();

            // Verify publish was successful
            await expect(page.locator('text=Publikováno, text=Published').first()).toBeVisible({ timeout: 5000 });
        });

        await allure.step('Step 3: Delete AI Bot', async () => {
            // Navigate back to AI Automations list
            await aiPage.navigateToAIAutomations();

            // Delete the bot
            await aiPage.deleteBot();

            // Verify bot was deleted
            await aiPage.verifyBotDeleted();
        });
    });
});
