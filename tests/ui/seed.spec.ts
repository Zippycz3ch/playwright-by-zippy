import { test, expect } from '@playwright/test';
import { LoginPage } from '../../interface/ui/loginPage';

test.describe('Seed', () => {
  test('navigate to multichannel onboarding', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
    await page.goto('https://app.smartsupp.com/app/dashboard/onboarding/multichannel');
    await page.waitForLoadState('networkidle');
  });
});
