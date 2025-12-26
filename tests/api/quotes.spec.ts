// tests/API/quotesRefactor.spec.ts
import { test } from '@playwright/test';
import { getQuotes } from "../../interface/api/ep/getQuotes/getQuotesBasic"
import { adminAccount } from '../../interface/api/common/accounts';
import { getQuotesContext } from '../../interface/api/ep/getQuotes/getQuotesContext';

test.describe("GET /api/quotes", { tag: ["@api"] }, () => {
    test('Basic - GET /api/quotes returns quotes', async ({ }) => {
        await test.step('Send GET /api/quotes request', async () => {
            await getQuotes(adminAccount);
        });
    });

    test('Context - GET /api/quotes returns quotes', async ({ }) => {
        await test.step('Send GET /api/quotes request', async () => {
            await getQuotesContext(adminAccount);
        });

        await test.step('Send GET /api/quotes request', async () => {
            await getQuotesContext(adminAccount, '200');
        });
    });
});