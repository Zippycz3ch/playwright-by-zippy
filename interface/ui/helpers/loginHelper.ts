import { Page } from '@playwright/test';
import { LoginPage } from '../loginpage';
import { DashboardPage } from '../dashboardPage';

export async function loginAndVerifyDashboard(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.login(process.env.SMARTSUPP_USERNAME!, process.env.SMARTSUPP_PASSWORD!);
    await dashboardPage.verifyDashboardPageLoaded();
}
