import { Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

export class MultichannelOnboardingPage {
    constructor(private page: Page) { }

    get letsGetStartedButton() {
        return this.page.locator('button:has-text("Let\'s get started!")');
    }

    async selectChannel(channel: 'Live chat' | 'Email' | 'Messenger' | 'WhatsApp' | 'Mira AI for your website') {
        await allure.step(`Select channel: ${channel}`, async () => {
            const card = this.page.locator('p').filter({ hasText: channel })
                .locator('xpath=ancestor::div[.//input[@type="checkbox"]][1]');
            await card.locator('input[type="checkbox"]').check({ force: true });
        });
    }

    async clickLetsGetStarted() {
        await allure.step('Click "Let\'s get started!" button', async () => {
            await this.letsGetStartedButton.click();
        });
    }
}
