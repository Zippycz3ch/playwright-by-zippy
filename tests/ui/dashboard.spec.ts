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
        await allure.step('Verify URL redirected to dashboard', async () => {
            await allure.step('Verify URL contains /dashboard', async () => {
                await expect(page).toHaveURL(/.*\/dashboard/);
            });

            await allure.step('Verify page title is "Smartsupp"', async () => {
                await expect(page).toHaveTitle('Smartsupp');
            });
        });

        await allure.step('Verify navigation sidebar is visible', async () => {
            await allure.step('Verify Home navigation is visible', async () => {
                await expect(dashboardPage.homeNav).toBeVisible();
            });

            await allure.step('Verify Inbox navigation is visible', async () => {
                await expect(dashboardPage.inboxNav).toBeVisible();
            });

            await allure.step('Verify AI Automations navigation is visible', async () => {
                await expect(dashboardPage.aiAutomationsNav).toBeVisible();
            });

            await allure.step('Verify Automations navigation is visible', async () => {
                await expect(dashboardPage.automationsNav).toBeVisible();
            });

            await allure.step('Verify Customers navigation is visible', async () => {
                await expect(dashboardPage.customersNav).toBeVisible();
            });

            await allure.step('Verify Statistics navigation is visible', async () => {
                await expect(dashboardPage.statisticsNav).toBeVisible();
            });

            await allure.step('Verify Settings navigation is visible', async () => {
                await expect(dashboardPage.settingsNav).toBeVisible();
            });
        });

        await allure.step('Verify main content area', async () => {
            await allure.step('Verify Dashboard heading is visible', async () => {
                await expect(dashboardPage.dashboardHeading).toBeVisible();
            });

            await allure.step('Verify "Connect additional channels" section is visible', async () => {
                await expect(dashboardPage.connectChannelsHeading).toBeVisible();
            });
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
