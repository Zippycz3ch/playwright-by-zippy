// tests/API/quotesRefactor.spec.ts
import { test } from '@playwright/test';
import { adminAccount } from '../../api/common/accounts';
import { getDoughs } from '../../api/EP/pizza/getDoughts/getDoughs';

test.describe("GET /api/doughs", { tag: ["@api"] }, () => {
    test('Basic - GET /api/doughs returns doughs', async ({ }) => {
        await test.step('Send GET /api/doughs request', async () => {
            await getDoughs(adminAccount);
        });
    });
});