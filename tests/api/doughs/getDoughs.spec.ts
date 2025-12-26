// tests/API/quotesRefactor.spec.ts
import { test } from '@playwright/test';
import { adminAccount } from '../../../interface/api/common/accounts';
import { getDoughs } from '../../../interface/api/ep/doughs/getDoughs';

test.describe("GET /api/doughs", { tag: ["@api"] }, () => {
    test('Basic - GET /api/doughs returns doughs', async ({ }) => {
        await test.step('Send GET /api/doughs request', async () => {
            await getDoughs(adminAccount);
        });
    });
});