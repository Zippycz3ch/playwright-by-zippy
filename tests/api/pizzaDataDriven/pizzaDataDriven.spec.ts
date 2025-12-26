import { test } from '@playwright/test';
import { adminAccount } from '../../../interface/api/common/accounts';
import { postPizza } from '../../../interface/api/ep/postPizza/postPizza';
import { pizzaExpectations } from './pizzaExpectations';

test.describe("POST /api/pizza - Data Driven", { tag: ["@api"] }, () => {
    for (const testCase of pizzaExpectations) {
        test(testCase.name, async () => {
            await test.step(`Send POST /api/pizza request - ${testCase.name}`, async () => {
                await postPizza(adminAccount, testCase.body, testCase.expectedStatus);
            });
        });
    }
});

