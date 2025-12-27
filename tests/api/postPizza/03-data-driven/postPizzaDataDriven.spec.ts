import { test } from '@playwright/test';
import { adminAccount } from '../../../../interface/api/common/accounts';
import { postPizza } from '../../../../interface/api/ep/pizza/postPizza';
import { pizzaExpectations } from './pizzaExpectations';
import { PizzaResponse } from '../../../../interface/api/models/PizzaResponse';
import * as allure from 'allure-js-commons';

test.describe("POST /api/pizza - Data Driven", { tag: ["@api"] }, () => {
    for (const testCase of pizzaExpectations) {
        test(testCase.name, async () => {
            const result = await test.step(`Send POST /api/pizza request - ${testCase.name}`, async () => {
                return await postPizza(adminAccount, testCase.body, testCase.expectedStatus);
            });

            if (testCase.validate) {
                await allure.step('Verify response matches expectations', async () => {
                    const data = result.data as PizzaResponse;
                    testCase.validate!(data);
                });
            }
        });
    }
});
