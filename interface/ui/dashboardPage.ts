import { Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { getAppBaseURL } from '../../config';

export class DashboardPage {
    constructor(private page: Page) { }

    // Navigation - Left Sidebar
    get homeNav() {
        return this.page.locator('a[href*="/dashboard/home"]').first();
    }

    get inboxNav() {
        return this.page.locator('a[href*="/dashboard/inbox"]');
    }

    get aiAutomationsNav() {
        return this.page.locator('a[href*="/dashboard/ai-automations"]');
    }

    get automationsNav() {
        return this.page.locator('a[href*="/dashboard/automations"]');
    }

    get customersNav() {
        return this.page.locator('a[href*="/dashboard/customers"]');
    }

    get statisticsNav() {
        return this.page.locator('a[href*="/dashboard/statistics"]');
    }

    get settingsNav() {
        return this.page.locator('a[href*="/dashboard/settings"]').and(this.page.locator('[aria-label="Settings"]'));
    }

    // Trial Banner & Upgrade
    get trialBanner() {
        return this.page.locator('text=You have').first();
    }

    get choosePlanButton() {
        return this.page.locator('button:has-text("Choose your plan")').first();
    }

    // Main Content
    get dashboardHeading() {
        return this.page.locator('h1:has-text("Dashboard")');
    }

    get productNewsButton() {
        return this.page.locator('button[aria-label="Product news"]');
    }

    get connectChannelsHeading() {
        return this.page.locator('h2:has-text("Connect additional channels")');
    }

    get getStartedSection() {
        return this.page.locator('text=Get started with Smartsupp');
    }

    // Connection Cards
    get connectEmailCard() {
        return this.page.locator('text=Connect Email');
    }

    get connectLiveChatCard() {
        return this.page.locator('text=Connect Live Chat');
    }

    get connectMessengerCard() {
        return this.page.locator('text=Connect Messenger');
    }

    get connectWhatsAppCard() {
        return this.page.locator('text=Connect WhatsApp');
    }

    // User Menu
    get profileLink() {
        return this.page.locator('a[href*="/settings/profile"]');
    }

    get logoutLink() {
        return this.page.locator('a:has-text("Logout")');
    }

    async navigate() {
        await allure.step('Navigate to Smartsupp dashboard', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/home`);
            await this.page.waitForLoadState('networkidle');

            // Verify URL
            await expect(this.page).toHaveURL(/\/app\/dashboard/);

            // Verify main navigation is visible
            await expect(this.homeNav).toBeVisible();
            await expect(this.inboxNav).toBeVisible();
            await expect(this.customersNav).toBeVisible();
            await expect(this.statisticsNav).toBeVisible();
            await expect(this.settingsNav).toBeVisible();

        });
    }

    async navigateToSection(section: 'inbox' | 'customers' | 'statistics' | 'settings' | 'automations' | 'ai-automations') {
        await allure.step(`Navigate to ${section}`, async () => {
            const navMap = {
                'inbox': this.inboxNav,
                'customers': this.customersNav,
                'statistics': this.statisticsNav,
                'settings': this.settingsNav,
                'automations': this.automationsNav,
                'ai-automations': this.aiAutomationsNav
            };
            await navMap[section].click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async verifyPageLoaded() {
        await allure.step('Verify URL and page loaded correctly', async () => {
            await allure.step('Verify URL contains /dashboard', async () => {
                await expect(this.page).toHaveURL(/.*\/dashboard/);
            });
            await allure.step('Verify page title is "Smartsupp"', async () => {
                await expect(this.page).toHaveTitle('Smartsupp');
            });
        });
    }

    async verifyNavigationSidebar() {
        await allure.step('Verify navigation sidebar', async () => {
            await allure.step('Verify Home navigation is visible', async () => {
                await expect(this.homeNav).toBeVisible();
            });
            await allure.step('Verify Inbox navigation is visible', async () => {
                await expect(this.inboxNav).toBeVisible();
            });
            await allure.step('Verify AI Automations navigation is visible', async () => {
                await expect(this.aiAutomationsNav).toBeVisible();
            });
            await allure.step('Verify Automations navigation is visible', async () => {
                await expect(this.automationsNav).toBeVisible();
            });
            await allure.step('Verify Customers navigation is visible', async () => {
                await expect(this.customersNav).toBeVisible();
            });
            await allure.step('Verify Statistics navigation is visible', async () => {
                await expect(this.statisticsNav).toBeVisible();
            });
            await allure.step('Verify Settings navigation is visible', async () => {
                await expect(this.settingsNav).toBeVisible();
            });
        });
    }

    async verifyMainContent() {
        await allure.step('Verify main content area', async () => {
            await allure.step('Verify Dashboard heading is visible', async () => {
                await expect(this.dashboardHeading).toBeVisible();
            });
            await allure.step('Verify Product news button is visible', async () => {
                await expect(this.productNewsButton).toBeVisible();
            });
            await allure.step('Verify "Connect additional channels" heading is visible', async () => {
                await expect(this.connectChannelsHeading).toBeVisible();
            });
        });
    }

    async verifyConnectionCards() {
        await allure.step('Verify connection cards', async () => {
            await allure.step('Verify Connect Email card is visible', async () => {
                await expect(this.connectEmailCard).toBeVisible();
            });
            await allure.step('Verify Connect Live Chat card is visible', async () => {
                await expect(this.connectLiveChatCard).toBeVisible();
            });
            await allure.step('Verify Connect Messenger card is visible', async () => {
                await expect(this.connectMessengerCard).toBeVisible();
            });
            await allure.step('Verify Connect WhatsApp card is visible', async () => {
                await expect(this.connectWhatsAppCard).toBeVisible();
            });
        });
    }
}
