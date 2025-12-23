import { test, expect } from '@playwright/test';
import { getBaseURL } from '../../config';

const BASE_URL = getBaseURL();

test.describe('QuickPizza Homepage', () => {
    test('should load homepage successfully', async ({ page }) => {
        await test.step('Navigate to homepage', async () => {
            await page.goto(BASE_URL);
        });

        await test.step('Verify page title', async () => {
            await expect(page).toHaveTitle('QuickPizza');
        });

        await test.step('Verify page is fully loaded', async () => {
            await page.waitForLoadState('load');
            await expect(page.locator('body')).toBeVisible();
        });
    });

    test('should display QuickPizza logo and branding', async ({ page }) => {
        await test.step('Navigate to homepage', async () => {
            await page.goto(BASE_URL);
        });

        await test.step('Verify logo is visible', async () => {
            const logo = page.getByRole('link', { name: 'logo' });
            await expect(logo).toBeVisible();
        });

        await test.step('Verify QuickPizza text is visible', async () => {
            await expect(page.getByText('QuickPizza').first()).toBeVisible();
        });
    });

    test('should display main heading and call to action', async ({ page }) => {
        await test.step('Navigate to homepage', async () => {
            await page.goto(BASE_URL);
        });

        await test.step('Verify main heading', async () => {
            await expect(page.getByRole('heading', { name: 'Looking to break out of your pizza routine?' })).toBeVisible();
        });

        await test.step('Verify subheading', async () => {
            await expect(page.getByRole('heading', { name: 'QuickPizza has your back!' })).toBeVisible();
        });

        await test.step('Verify Pizza Please button', async () => {
            const button = page.getByRole('button', { name: 'Pizza, Please!' });
            await expect(button).toBeVisible();
        });
    });

    test('should display pizza recommendation when button clicked', async ({ page }) => {
        await test.step('Navigate to homepage', async () => {
            await page.goto(BASE_URL);
        });

        await test.step('Click Pizza Please button', async () => {
            await page.getByRole('button', { name: 'Pizza, Please!' }).click();
        });

        await test.step('Verify recommendation appears', async () => {
            await expect(page.getByRole('heading', { name: 'Our recommendation:' })).toBeVisible();
        });

        await test.step('Verify recommendation details', async () => {
            await expect(page.getByText(/Name:/)).toBeVisible();
            await expect(page.getByText(/Dough:/)).toBeVisible();
            await expect(page.getByText(/Ingredients:/)).toBeVisible();
        });

        await test.step('Verify action buttons', async () => {
            await expect(page.getByRole('button', { name: 'No thanks' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Love it!' })).toBeVisible();
        });
    });

    test('should have Login/Profile link in navigation', async ({ page }) => {
        await test.step('Navigate to homepage', async () => {
            await page.goto(BASE_URL);
        });

        await test.step('Verify Login link exists', async () => {
            const loginLink = page.getByRole('link', { name: 'Login/Profile' });
            await expect(loginLink).toBeVisible();
        });

        await test.step('Verify Login link navigates to login page', async () => {
            await page.getByRole('link', { name: 'Login/Profile' }).click();
            await expect(page).toHaveURL(/.*\/login/);
            await expect(page.getByRole('heading', { name: 'QuickPizza User Login' })).toBeVisible();
        });
    });

    test('should display footer information', async ({ page }) => {
        await test.step('Navigate to homepage', async () => {
            await page.goto(BASE_URL);
        });

        await test.step('Verify footer content', async () => {
            await expect(page.getByText('Made with ❤️ by QuickPizza Labs.')).toBeVisible();
        });

        await test.step('Verify WebSocket visitor ID', async () => {
            await expect(page.getByText(/WebSocket visitor ID:/)).toBeVisible();
        });

        await test.step('Verify admin page link', async () => {
            await expect(page.getByRole('link', { name: 'Click here' })).toBeVisible();
        });

        await test.step('Verify GitHub link', async () => {
            const githubLink = page.getByRole('link', { name: 'GitHub' });
            await expect(githubLink).toBeVisible();
            await expect(githubLink).toHaveAttribute('href', 'https://github.com/grafana/quickpizza');
        });
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
        await test.step('Set mobile viewport', async () => {
            await page.setViewportSize({ width: 375, height: 667 });
        });

        await test.step('Navigate to homepage', async () => {
            await page.goto(BASE_URL);
        });

        await test.step('Verify page loads on mobile', async () => {
            await expect(page).toHaveTitle('QuickPizza');
            await expect(page.getByRole('button', { name: 'Pizza, Please!' })).toBeVisible();
        });

        await test.step('Verify mobile navigation', async () => {
            await expect(page.getByRole('link', { name: 'Login/Profile' })).toBeVisible();
        });
    });

    test('should display quote about pizza', async ({ page }) => {
        await test.step('Navigate to homepage', async () => {
            await page.goto(BASE_URL);
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
