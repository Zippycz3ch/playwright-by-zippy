import { test } from '@playwright/test';
import { postPizza } from '../../../../interface/api/ep/pizza/postPizza';
import { UserData } from '../../../../interface/api/models/UserData';
import { PizzaRestrictions } from '../../../../interface/api/models/PizzaRestrictions';

interface UnauthorizedTestCase {
    name: string;
    body?: PizzaRestrictions;
}

const unauthorizedTests: UnauthorizedTestCase[] = [
    { name: 'No credentials - no restrictions', body: undefined },
    { name: 'No credentials - with vegetarian restriction', body: { mustBeVegetarian: true } },
    { name: 'No credentials - with calorie restriction', body: { maxCaloriesPerSlice: 300 } }
];

test.describe("POST /api/pizza - Unauthorized (401)", { tag: ["@api"] }, () => {
    const emptyCredentials = new UserData('', '');

    for (const testCase of unauthorizedTests) {
        test(testCase.name, async () => {
            await test.step(`Send POST /api/pizza request with no credentials - ${testCase.name}`, async () => {
                await postPizza(emptyCredentials, testCase.body, '401');
            });
        });
    }
});
