import { test as base, expect } from '@playwright/test';
import { setupNewUser } from '../../interface/api/actions/userHelpers';
import { loginUser } from '../../interface/api/ep/loginUser/loginUser';

type UserFixture = {
    newUser: {
        username: string;
        password: string;
        userId: number;
    };
};

const test = base.extend<UserFixture>({
    newUser: async ({ }, use) => {
        const user = await setupNewUser();
        await use(user);
    }
});

test.describe("User Registration and Login Scenario with Fixture", { tag: ["@scenario"] }, () => {

    test("Create new user and login via API", async ({ newUser }) => {
        await test.step('Login via API with new user', async () => {
            await loginUser({ username: newUser.username, password: newUser.password });
        });
    });
});
