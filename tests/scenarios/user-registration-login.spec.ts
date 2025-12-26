import { test, expect } from '@playwright/test';
import { setupNewUser, DEFAULT_USERNAME, DEFAULT_PASSWORD } from '../../interface/api/actions/userHelpers';
import { loginUser } from '../../interface/api/ep/quickpizza/loginUser/loginUser';
import { QuickPizzaLoginPage } from '../../interface/ui/loginpage';

test.describe("User Registration and Login Scenario", { tag: ["@scenario"] }, () => {

    test("Login with default user via API", async () => {
        await test.step('Login via API with default user', async () => {
            await loginUser({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD });
        });
    });

    test("Login with default user via UI", async ({ page }) => {
        await test.step('Login via UI with default user', async () => {
            const loginPage = new QuickPizzaLoginPage(page);
            await loginPage.navigate();
            await loginPage.login(DEFAULT_USERNAME, DEFAULT_PASSWORD);
        });
    });

    test("Create new user and login via API", async () => {
        const { username, password } = await setupNewUser();

        await test.step('Login via API with new user', async () => {
            await loginUser({ username, password });
        });
    });

    test("Create new user and login via UI", async ({ page }) => {
        const { username, password } = await setupNewUser();

        await test.step('Login via UI with new user', async () => {
            const loginPage = new QuickPizzaLoginPage(page);
            await loginPage.navigate();
            await loginPage.login(username, password);
        });
    });

    test("Failed login with invalid credentials via API", async () => {
        await test.step('Attempt login via API with invalid credentials', async () => {
            await loginUser({ username: 'nonexistent_user', password: 'wrong_password' }, '401');
        });
    });

    test("Failed login with invalid credentials via UI", async ({ page }) => {
        await test.step('Attempt login via UI with invalid credentials', async () => {
            const loginPage = new QuickPizzaLoginPage(page);
            await loginPage.navigate();
            await loginPage.loginWithInvalidCredentials('nonexistent_user', 'wrong_password');
        });
    });
});
