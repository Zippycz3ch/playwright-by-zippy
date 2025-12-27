import { test } from '@playwright/test';
import { adminAccount } from '../../../../interface/api/common/accounts';
import { postPizza } from '../../../../interface/api/ep/pizza/postPizza';

test.describe("POST /api/pizza - Basic", { tag: ["@api"] }, () => {
    test('Basic - POST /api/pizza returns pizza recommendation', async () => {
        await test.step('Send POST /api/pizza request without restrictions', async () => {
            await postPizza(adminAccount);
        });
    });
});
