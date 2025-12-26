import { test } from '@playwright/test';
import { postUsers } from '../../../interface/api/ep/users/postUsers';
import { createUserExpectations } from './createUserExpectations';

test.describe("POST /api/users - Data Driven", { tag: ["@api"] }, () => {
    for (const testCase of createUserExpectations) {
        test(testCase.name, async () => {
            await test.step(`Send POST /api/users request - ${testCase.name}`, async () => {
                await postUsers(testCase.body, testCase.expectedStatus);
            });
        });
    }
});
