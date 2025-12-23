import { test, expect } from '@playwright/test';
import { QuickPizzaHomepage } from '../../interface/ui/homepage';

test.describe('QuickPizza Homepage', () => {
    let quickPizza: QuickPizzaHomepage;

    test.beforeEach(async ({ page }) => {
        quickPizza = new QuickPizzaHomepage(page);
        await test.step('Navigate to homepage', async () => {
            await quickPizza.navigate();
        });
    });

    test('should load homepage successfully', async () => {
        await test.step('Verify page title', async () => {
            await quickPizza.verifyTitle();
        });

        await test.step('Verify page is fully loaded', async () => {
            await quickPizza.verifyHomepageLoaded();
        });
    });

    test('should display QuickPizza logo and branding', async ({ page }) => {
        await test.step('Verify logo is visible', async () => {
            await expect(await quickPizza.getLogo()).toBeVisible();
        });

        await test.step('Verify QuickPizza text is visible', async () => {
            await expect(page.getByText('QuickPizza').first()).toBeVisible();
        });
    });

    test('should display main heading and call to action', async ({ page }) => {
        await test.step('Verify main heading', async () => {
            await expect(page.getByRole('heading', { name: 'Looking to break out of your pizza routine?' })).toBeVisible();
        });

        await test.step('Verify subheading', async () => {
            await expect(page.getByRole('heading', { name: 'QuickPizza has your back!' })).toBeVisible();
        });

        await test.step('Verify Pizza Please button', async () => {
            await expect(await quickPizza.getPizzaButton()).toBeVisible();
        });
    });

    test('should display pizza recommendation when button clicked', async ({ page }) => {
        await test.step('Click Pizza Please button', async () => {
            await quickPizza.clickPizzaButton();
        });

        await test.step('Verify recommendation appears', async () => {
            await expect(await quickPizza.getRecommendationHeading()).toBeVisible();
        });

        await test.step('Verify recommendation details', async () => {
            const details = [/Name:/, /Dough:/, /Ingredients:/];
            for (const detail of details) {
                await expect(page.getByText(detail)).toBeVisible();
            }
        });

        await test.step('Verify action buttons', async () => {
            const buttons = ['No thanks', 'Love it!'];
            for (const buttonName of buttons) {
                await expect(page.getByRole('button', { name: buttonName })).toBeVisible();
            }
        });
    });

    test('should have Login/Profile link in navigation', async ({ page }) => {
        await test.step('Verify Login link exists', async () => {
            await expect(await quickPizza.getLoginLink()).toBeVisible();
        });

        await test.step('Verify Login link navigates to login page', async () => {
            await (await quickPizza.getLoginLink()).click();
            await expect(page).toHaveURL(/.*\/login/);
            await expect(page.getByRole('heading', { name: 'QuickPizza User Login' })).toBeVisible();
        });
    });

    test('should display footer information', async ({ page }) => {
        const footerElements = [
            { type: 'text', locator: page.getByText('Made with ❤️ by QuickPizza Labs.') },
            { type: 'regex', locator: page.getByText(/WebSocket visitor ID:/) },
            { type: 'link', locator: page.getByRole('link', { name: 'Click here' }) },
        ];

        await test.step('Verify footer content', async () => {
            for (const element of footerElements) {
                await expect(element.locator).toBeVisible();
            }
        });

        await test.step('Verify GitHub link', async () => {
            const githubLink = page.getByRole('link', { name: 'GitHub' });
            await expect(githubLink).toBeVisible();
            await expect(githubLink).toHaveAttribute('href', 'https://github.com/grafana/quickpizza');
        });
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
        await test.step('Set mobile viewport', async () => {
            await quickPizza.setMobileViewport();
        });

        await test.step('Navigate to homepage on mobile', async () => {
            await quickPizza.navigate();
        });

        await test.step('Verify page loads on mobile', async () => {
            await quickPizza.verifyTitle();
            await expect(await quickPizza.getPizzaButton()).toBeVisible();
        });

        await test.step('Verify mobile navigation', async () => {
            await expect(await quickPizza.getLoginLink()).toBeVisible();
        });
    });

    test('should display quote about pizza', async ({ page }) => {
        await test.step('Navigate to homepage', async () => {
            await quickPizza.navigate();
            await page.waitForLoadState('networkidle');
        });

        await test.step('Verify a quote is visible', async () => {
            // Quote changes every time, so check for the pattern and that it has text
            const quote = page.locator('text=/".+"/');
            await expect(quote).toBeVisible();
            const quoteText = await quote.textContent();
            expect(quoteText).toBeTruthy();
            expect(quoteText).toContain('"');
        });
    });
});
