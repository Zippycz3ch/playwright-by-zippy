import { test, expect } from '@playwright/test';
import { getBaseURL } from '../../../../config';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as allure from 'allure-js-commons';

test.describe("POST /api/pizza - Standalone", { tag: ["@api"] }, () => {
    test('Basic - POST /api/pizza returns pizza recommendation', async () => {

        const result = await allure.step('POST -> /api/pizza', async () => {
            // 1. Prepare request
            const baseUrl = getBaseURL();
            const endpoint = '/api/pizza';
            const url = `${baseUrl}${endpoint}`;
            const accessToken = 'abcdef0123456789';
            const method = 'POST';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `token ${accessToken}`
            };
            const body = {};

            await allure.step('Request', async (step) => {
                step.parameter('Url', url);
                step.parameter('Headers', JSON.stringify(headers, null, 10));
                step.parameter('Method', method);
                step.parameter('Body', JSON.stringify(body, null, 10));
            });

            // 2. Send request
            const startTime = Date.now();
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            });
            const duration = Date.now() - startTime;

            // 3. Parse response
            const responseText = await response.text();
            let data: unknown;
            try {
                data = JSON.parse(responseText);
            } catch {
                data = responseText;
            }

            await allure.step('Response', async (step) => {
                step.parameter('Status', response.status.toString());
                step.parameter('Headers', JSON.stringify(Object.fromEntries(response.headers), null, 10));
                step.parameter('Duration', `${duration} ms`);
                step.parameter('Body', JSON.stringify(data));
            });

            return { response, duration, data };
        });

        // Verify 200 response
        await allure.step('Verify 200 response', async () => {
            // Status check
            expect(result.response.status, 'Expected status code to be 200').toBe(200);

            // Duration check
            const expectedDuration = 1600;
            expect(result.duration, `Expected response time less than ${expectedDuration}ms, got ${result.duration}ms`)
                .toBeLessThan(expectedDuration);

            // Schema validation
            await allure.step('JSON schema check', async () => {
                const schema = {
                    type: "object",
                    properties: {
                        pizza: {
                            type: "object",
                            properties: {
                                id: { type: "number" },
                                name: { type: "string" },
                                dough: {
                                    type: "object",
                                    properties: {
                                        id: { type: "number" },
                                        name: { type: "string" },
                                        caloriesPerSlice: { type: "number" }
                                    },
                                    required: ["name", "caloriesPerSlice"]
                                },
                                ingredients: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "number" },
                                            name: { type: "string" },
                                            caloriesPerSlice: { type: "number" },
                                            vegetarian: { type: "boolean" }
                                        },
                                        required: ["name", "caloriesPerSlice", "vegetarian"]
                                    }
                                },
                                tool: { type: "string" }
                            },
                            required: ["id", "name", "dough", "ingredients", "tool"]
                        },
                        calories: { type: "number" },
                        vegetarian: { type: "boolean" }
                    },
                    required: ["pizza", "calories", "vegetarian"]
                };

                const ajv = new Ajv({ allErrors: true, strict: true });
                addFormats(ajv);
                const isValid = ajv.validate(schema, result.data);

                if (!isValid) {
                    const errorDetails = ajv.errors?.map(error =>
                        `Path "${error.instancePath || 'root'}": ${error.message} (received: ${JSON.stringify(error.data)})`
                    ).join('; ') || 'Unknown validation error';

                    const errorMessage = `Schema validation failed with ${ajv.errors?.length || 0} error(s): ${errorDetails}`;

                    console.error("❌ Schema validation failed!");
                    console.error("Validation errors:", JSON.stringify(ajv.errors, null, 2));

                    throw new Error(errorMessage);
                }
            });
        });
    });
});
