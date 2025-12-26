
import Ajv from "ajv";
import addFormats from "ajv-formats";
import * as allure from 'allure-js-commons';
import { expect } from '@playwright/test';
import { schema as errorSchema } from '../schemas/error';

export enum Duration {
    shortest = 200,
    shorter = 400,
    short = 800,
    medium = 1600,
    long = 3200,
    longer = 6400,
}

const createAjvInstance = () => {
    const ajv = new Ajv({ allErrors: true, strict: true });
    addFormats(ajv);
    return ajv;
};

export interface ApiTestResult {
    response: Response;
    duration: number;
    data: unknown;
}

function checkDuration(result: ApiTestResult, expectedDuration: Duration): void {
    expect(result.duration, `Expected response time less than ${expectedDuration}ms, got ${result.duration}ms`).toBeLessThan(expectedDuration);
}

export function check200(result: ApiTestResult, schema: object, expectedDuration: Duration): void {
    allure.step('Verify 200 response', () => {
        expect(result.response.status, `Expected status code to be 200`).toBe(200);
        checkDuration(result, expectedDuration);
        validateJsonSchema(result.data, schema);
    });
}

export function check201(result: ApiTestResult, schema: object, expectedDuration: Duration): void {
    allure.step('Verify 201 response', () => {
        expect(result.response.status, `Expected status code to be 201`).toBe(201);
        checkDuration(result, expectedDuration);
        validateJsonSchema(result.data, schema);
    });
}

export function check401(result: ApiTestResult): void {
    allure.step('Verify 401 response', () => {
        expect(result.response.status, `Expected status code to be 401`).toBe(401);
        checkDuration(result, Duration.short);
        validateJsonSchema(result.data, errorSchema);
        const errorData = result.data as { error?: string };
        expect(errorData.error, `Expected error message to be "authentication failed"`).toBe('authentication failed');
    });
}

export function check400(result: ApiTestResult): void {
    allure.step('Verify 400 response', () => {
        expect(result.response.status, `Expected status code to be 400`).toBe(400);
        checkDuration(result, Duration.short);
        validateJsonSchema(result.data, errorSchema);
        const errorData = result.data as { error?: string };
        expect(errorData.error, `Expected error message in response`).toBeTruthy();
    });
}

export function check403(result: ApiTestResult): void {
    allure.step('Verify 403 response', () => {
        expect(result.response.status, `Expected status code to be 403`).toBe(403);
        checkDuration(result, Duration.short);
        validateJsonSchema(result.data, errorSchema);
    });
}

export function validateJsonSchema(data: unknown, schema: any): void {
    allure.step('JSON schema check', () => {
        const ajv = createAjvInstance();
        const isValid = ajv.validate(schema, data);

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
}




