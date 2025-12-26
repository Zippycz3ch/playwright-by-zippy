import { test } from '@playwright/test';
import { adminAccount } from '../../interface/api/common/accounts';
import { postPizza } from '../../interface/api/ep/quickpizza/postPizza/postPizza';
import { pizzaExpectations } from './pizzaExpectations';
import { UserData } from '../../interface/api/models/UserData';

test.describe("POST /api/pizza - Data Driven", { tag: ["@api"] }, () => {
    for (const testCase of pizzaExpectations) {
        test(testCase.name, async () => {
            await test.step(`Send POST /api/pizza request - ${testCase.name}`, async () => {
                const userData = testCase.unauthenticated ? new UserData('', '') : adminAccount;
                await postPizza(userData, testCase.body, testCase.expectedStatus);
            });
        });
    }
});

