import { test } from '@playwright/test';
import { createUser } from '../../../interface/api/ep/createUser/createUser';
import { createUserExpectations } from './createUserExpectations';

test.describe("POST /api/users - Data Driven", { tag: ["@api"] }, () => {
    for (const testCase of createUserExpectations) {
        test(testCase.name, async () => {
            await test.step(`Send POST /api/users request - ${testCase.name}`, async () => {
                await createUser(testCase.body, testCase.expectedStatus);
            });
        });
    }
});
