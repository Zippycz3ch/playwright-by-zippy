import { Page, BrowserContext, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
type DashboardSection = 'inbox' | 'customers' | 'statistics' | 'settings' | 'automations' | 'ai-automations';

export class DashboardPage {
    constructor(private page: Page) { }

    // Navigation - Left Sidebar
    get homeNav() {
        return this.page.getByTestId('sidebar-smarthub');
    }

    get inboxNav() {
        return this.page.getByTestId('sidebar-conversations');
    }

    get aiAutomationsNav() {
        return this.page.getByTestId('sidebar-ai-automations');
    }

    get automationsNav() {
        return this.page.getByTestId('sidebar-automations');
    }

    get customersNav() {
        return this.page.getByTestId('sidebar-customers');
    }

    get statisticsNav() {
        return this.page.getByTestId('sidebar-statistics');
    }

    get settingsNav() {
        return this.page.getByTestId('sidebar-settings');
    }

    // Main Content
    get dashboardHeading() {
        return this.page.locator('h1.chakra-heading:has-text("Dashboard")');
    }

    get productNewsButton() {
        return this.page.getByTestId('news-open');
    }

    get connectChannelsHeading() {
        return this.page.locator('h2:has-text("Connect additional channels")');
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

    private getSectionNav(section: DashboardSection) {
        const navMap = {
            'inbox': this.inboxNav,
            'customers': this.customersNav,
            'statistics': this.statisticsNav,
            'settings': this.settingsNav,
            'automations': this.automationsNav,
            'ai-automations': this.aiAutomationsNav
        };
        return navMap[section];
    }

    async navigateToSection(section: DashboardSection) {
        await allure.step(`Navigate to ${section}`, async () => {
            await this.getSectionNav(section).click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async verifySectionPageLoaded(section: DashboardSection) {
        await allure.step(`Verify URL redirected to ${section} page`, async () => {
            await expect(this.page).toHaveURL(new RegExp(`.*\\/${section}`));
        });
    }

    async verifyNavigationSidebarLoaded() {
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
    }

    async verifyMainContentLoaded() {
        await allure.step('Verify Dashboard heading is visible', async () => {
            await expect(this.dashboardHeading).toBeVisible();
        });
        await allure.step('Verify Product news button is visible', async () => {
            await expect(this.productNewsButton).toBeVisible();
        });
        await allure.step('Verify "Connect additional channels" heading is visible', async () => {
            await expect(this.connectChannelsHeading).toBeVisible();
        });
    }

    async verifyConnectionCardsLoaded() {
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
    }

    async verifyDashboardPageLoaded() {
        await allure.step('Verify dashboard loaded', async () => {
            await allure.step('Verify URL contains /dashboard', async () => {
                await expect(this.page).toHaveURL(/.*\/dashboard/);
            });
            await allure.step('Verify page title is "Smartsupp"', async () => {
                await expect(this.page).toHaveTitle(/(\(\d+\) )?Smartsupp( Dashboard)?/);
            });
            await this.verifyNavigationSidebarLoaded();
            await this.verifyMainContentLoaded();
            await this.verifyConnectionCardsLoaded();
        });
    }

    async openInbox() {
        await allure.step('Open Inbox', async () => {
            await this.inboxNav.click();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);
        });
    }

    get discoverLiveChatArticle() {
        return this.page.locator('text=Discover how the live chat works');
    }

    async openDiscoverLiveChatArticle() {
        await allure.step('Open Discover how the live chat works article', async () => {
            await this.discoverLiveChatArticle.click();
            await this.page.waitForTimeout(1000);
        });
    }

    async startTestConversation(context: BrowserContext): Promise<Page> {
        let visitorPage!: Page;
        await allure.step('Start test conversation', async () => {
            const pagePromise = context.waitForEvent('page');
            await this.page.getByRole('button', { name: 'Try a Test Conversation' }).click();
            visitorPage = await pagePromise;
            await visitorPage.waitForLoadState('networkidle');
            await visitorPage.waitForTimeout(2000);
        });
        return visitorPage;
    }
}
