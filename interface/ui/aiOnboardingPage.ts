import { Page, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { getAppBaseURL } from '../../config';

export class AiOnboardingPage {
    constructor(private page: Page) { }

    // Navigation Tabs
    get aiAssistantsTab() {
        return this.page.locator('a[href*="/ai-automations/ai-chatbots"]').filter({ hasText: 'AI Assistants' });
    }

    get sourcesTab() {
        return this.page.locator('a[href*="/ai-automations/sources"]').filter({ hasText: 'Sources' });
    }

    get satisfactionTab() {
        return this.page.locator('a[href*="/ai-automations/satisfaction"]').filter({ hasText: 'Satisfaction' });
    }

    get trainingTab() {
        return this.page.locator('a[href*="/ai-automations/custom-responses"]').filter({ hasText: 'Training' });
    }

    // Video Tutorial Sections
    get setupVideoSection() {
        return this.page.locator('text=How to set up Mira AI assistant').locator('..');
    }

    get setupVideoTitle() {
        return this.page.locator('text=How to set up Mira AI assistant');
    }

    get setupVideoDescription() {
        return this.page.locator('text=Learn how to set up Mira AI and boost your sales today!');
    }

    get setupVideoIframe() {
        return this.page.frameLocator('iframe').first();
    }

    get sourcesVideoSection() {
        return this.page.locator('text=Learn how to add, edit, update, and manage sources for Mira AI').locator('..');
    }

    get sourcesVideoTitle() {
        return this.page.locator('p:has-text("Sources")').first();
    }

    get sourcesVideoDescription() {
        return this.page.locator('text=Learn how to add, edit, update, and manage sources for Mira AI');
    }

    get satisfactionVideoSection() {
        return this.page.locator('text=Mira AI Satisfaction rating').locator('..');
    }

    get satisfactionVideoTitle() {
        return this.page.locator('text=Mira AI Satisfaction rating');
    }

    get satisfactionVideoDescription() {
        return this.page.locator('text=Learn how to make your Mira AI even better through the Satisfaction rating');
    }

    get trainingVideoSection() {
        return this.page.locator('text=Training 🏋️').locator('..');
    }

    get trainingVideoTitle() {
        return this.page.locator('text=Training 🏋️');
    }

    get trainingVideoDescription() {
        return this.page.locator('text=Learn how to make your AI Shopping Assistant better with the training section');
    }

    // Page Elements
    get pageHeading() {
        return this.page.locator('h1:has-text("AI Assistants")');
    }

    get giveFeedbackLink() {
        return this.page.locator('text=Give us feedback');
    }

    get addNewButton() {
        return this.page.locator('button:has-text("Add new")');
    }

    // Navigation Methods
    async navigate() {
        await allure.step('Navigate to AI Onboarding page and verify page loaded', async () => {
            await this.page.goto(`${getAppBaseURL()}/app/dashboard/ai-automations/onboarding`);
            await this.page.waitForLoadState('networkidle');

            // Verify URL
            await expect(this.page).toHaveURL(/ai-automations\/onboarding/);

            // Verify main page elements are visible
            await expect(this.pageHeading).toBeVisible();
            await expect(this.setupVideoTitle).toBeVisible();
            await expect(this.aiAssistantsTab).toBeVisible();
        });
    }

    // Actions
    async clickAiAssistantsTab() {
        await allure.step('Click AI Assistants tab', async () => {
            await this.aiAssistantsTab.click();
            await this.page.waitForURL(/ai-chatbots/);
        });
    }

    async clickSourcesTab() {
        await allure.step('Click Sources tab', async () => {
            await this.sourcesTab.click();
            await this.page.waitForURL(/sources/);
        });
    }

    async clickSatisfactionTab() {
        await allure.step('Click Satisfaction tab', async () => {
            await this.satisfactionTab.click();
            await this.page.waitForURL(/satisfaction/);
        });
    }

    async clickTrainingTab() {
        await allure.step('Click Training tab', async () => {
            await this.trainingTab.click();
            await this.page.waitForURL(/custom-responses/);
        });
    }

    async clickGiveFeedback() {
        await allure.step('Click Give Feedback link', async () => {
            await this.giveFeedbackLink.click();
        });
    }

    async verifyAllVideoSectionsVisible() {
        await allure.step('Verify all video tutorial sections are visible', async () => {
            await expect(this.setupVideoSection).toBeVisible();
            await expect(this.sourcesVideoSection).toBeVisible();
            await expect(this.satisfactionVideoSection).toBeVisible();
            await expect(this.trainingVideoSection).toBeVisible();
        });
    }

    async verifyNavigationTabs() {
        await allure.step('Verify all navigation tabs are visible', async () => {
            await expect(this.aiAssistantsTab).toBeVisible();
            await expect(this.sourcesTab).toBeVisible();
            await expect(this.satisfactionTab).toBeVisible();
            await expect(this.trainingTab).toBeVisible();
        });
    }
}
