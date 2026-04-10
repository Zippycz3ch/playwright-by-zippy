import { test } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';
import { DashboardPage } from '../../interface/ui/dashboardPage';
import { MultichannelOnboardingPage } from '../../interface/ui/multichannelOnboardingPage';
import * as allure from 'allure-js-commons';

// This test will only work for user that was fresly created and has not completed onboarding yet. 

test.describe('Onboarding to Smartsupp', { tag: ['@scenario'] }, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let onboardingPage: MultichannelOnboardingPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        onboardingPage = new MultichannelOnboardingPage(page);

        // Login to Smartsupp
        await loginPage.navigate();
        await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
    });

    test('Onboard', async ({ page }) => {
        await allure.step('Onboarding to app', async () => {
            await onboardingPage.selectChannel('Mira AI for your website');
            await onboardingPage.clickLetsGetStarted();
        });
    });
});