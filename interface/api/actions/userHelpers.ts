import { createUser, CreateUserResponse } from '../ep/quickpizza/createUser/createUser';
import { ApiTestResult } from '../common/checks';
import { test } from '@playwright/test';

export const DEFAULT_PASSWORD = '12345678';
export const DEFAULT_USERNAME = 'default';

/**
 * Creates a new user with randomly generated username and static password
 * @returns Object containing username, password, and API result with user data
 */
export async function createRandomUser(): Promise<{ username: string; password: string; result: ApiTestResult }> {
    const timestamp = Date.now();
    const username = `user${timestamp}`;
    const password = DEFAULT_PASSWORD;

    const result = await createUser({ username, password });

    return {
        username,
        password,
        result
    };
}

/**
 * Creates a new user with test step wrapper
 * @returns Object containing username, password, and userId
 */
export async function setupNewUser(): Promise<{ username: string; password: string; userId: number }> {
    let username: string;
    let password: string;
    let userId: number;

    await test.step('Create new user via API', async () => {
        const user = await createRandomUser();
        username = user.username;
        password = user.password;
        userId = (user.result.data as CreateUserResponse).id;
    });

    return { username, password, userId };
}
