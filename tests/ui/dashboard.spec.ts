import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import * as allure from 'allure-js-commons';

test.describe('Smartsupp Dashboard', { tag: ['@ui'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginPage.navigate();
        await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
    });

    test('dashboard loads after login @UI', async ({ page }) => {
        await allure.step('Verify URL and page loaded correctly', async () => {
            await expect(page).toHaveURL(/.*\/dashboard/);
            await expect(page).toHaveTitle('Smartsupp');
        });

        await allure.step('Verify navigation sidebar', async () => {
            await expect(dashboardPage.homeNav).toBeVisible();
            await expect(dashboardPage.inboxNav).toBeVisible();
            await expect(dashboardPage.aiAutomationsNav).toBeVisible();
            await expect(dashboardPage.automationsNav).toBeVisible();
            await expect(dashboardPage.customersNav).toBeVisible();
            await expect(dashboardPage.statisticsNav).toBeVisible();
            await expect(dashboardPage.settingsNav).toBeVisible();
        });

        await allure.step('Verify main content area', async () => {
            await expect(dashboardPage.dashboardHeading).toBeVisible();
            await expect(dashboardPage.productNewsButton).toBeVisible();
            await expect(dashboardPage.connectChannelsHeading).toBeVisible();
        });

        await allure.step('Verify connection cards', async () => {
            await expect(dashboardPage.connectEmailCard).toBeVisible();
            await expect(dashboardPage.connectLiveChatCard).toBeVisible();
            await expect(dashboardPage.connectMessengerCard).toBeVisible();
            await expect(dashboardPage.connectWhatsAppCard).toBeVisible();
        });
    });

    test('navigate to settings @UI', async ({ page }) => {
        await dashboardPage.navigateToSection('settings');

        await allure.step('Verify URL redirected to settings page', async () => {
            await expect(page).toHaveURL(/.*\/settings/);
        });
    });

    test('navigate to customers @UI', async ({ page }) => {
        await dashboardPage.navigateToSection('customers');

        await allure.step('Verify URL redirected to customers page', async () => {
            await expect(page).toHaveURL(/.*\/customers/);
        });
    });
});
