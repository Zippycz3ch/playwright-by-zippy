
import Ajv from "ajv";
import addFormats from "ajv-formats";

export enum Duration {
    shortest = 200,
    shorter = 400,
    short = 800,
    medium = 1600,
    long = 3200,
    longer = 6400,
}

const schema401 = {}
const schema403 = {}

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

export interface CheckResult {
    passed: boolean;
    errors: string[];
}

export function check200(result: ApiTestResult, schema: object, expectedDuration: Duration): CheckResult {
    const errors: string[] = [];

    if (result.response.status !== 200) {
        errors.push(`Expected status code to be 200, got ${result.response.status}`);
    }

    const timeCheck = checkResponseTime(result, expectedDuration);
    if (!timeCheck.passed) {
        errors.push(...timeCheck.errors);
    }

    const validationResult = validateJsonSchemaWithErrors(result.data, schema);
    if (!validationResult.isValid) {
        errors.push(validationResult.errorMessage);
    }

    return { passed: errors.length === 0, errors };
}

export function check401(result: ApiTestResult): CheckResult {
    const errors: string[] = [];

    if (result.response.status !== 401) {
        errors.push(`Expected status code to be 401, got ${result.response.status}`);
    }

    const timeCheck = checkResponseTime(result, Duration.short);
    if (!timeCheck.passed) {
        errors.push(...timeCheck.errors);
    }

    const validationResult = validateJsonSchemaWithErrors(result.data, schema401);
    if (!validationResult.isValid) {
        errors.push(validationResult.errorMessage);
    }

    return { passed: errors.length === 0, errors };
}

export function check403(result: ApiTestResult): CheckResult {
    const errors: string[] = [];

    if (result.response.status !== 403) {
        errors.push(`Expected status code to be 403, got ${result.response.status}`);
    }

    const timeCheck = checkResponseTime(result, Duration.short);
    if (!timeCheck.passed) {
        errors.push(...timeCheck.errors);
    }

    const validationResult = validateJsonSchemaWithErrors(result.data, schema403);
    if (!validationResult.isValid) {
        errors.push(validationResult.errorMessage);
    }

    return { passed: errors.length === 0, errors };
}

export function checkResponseTime(result: ApiTestResult, expectedDuration: Duration): CheckResult {
    if (result.duration >= expectedDuration) {
        return {
            passed: false,
            errors: [`Expected response time to be less than ${expectedDuration}ms, got ${result.duration}ms`]
        };
    }
    return { passed: true, errors: [] };
}

export function validateJsonSchema(data: unknown, schema: any): boolean {
    const result = validateJsonSchemaWithErrors(data, schema);
    return result.isValid;
}

export function validateJsonSchemaWithErrors(data: unknown, schema: any): { isValid: boolean; errorMessage: string } {
    console.log("Starting schema validation...");
    // console.log("Data being validated:", JSON.stringify(data, null, 2));

    const ajv = createAjvInstance();
    const isValid = ajv.validate(schema, data);

    if (!isValid) {
        const errorDetails = ajv.errors?.map(error =>
            `Path "${error.instancePath || 'root'}": ${error.message} (received: ${JSON.stringify(error.data)})`
        ).join('; ') || 'Unknown validation error';

        const errorMessage = `Schema validation failed with ${ajv.errors?.length || 0} error(s): ${errorDetails}`;

        console.error("❌ Schema validation failed!");
        console.error("Validation errors:", JSON.stringify(ajv.errors, null, 2));

        return { isValid: false, errorMessage };
    }

    console.log("✅ Schema validation passed.");
    return { isValid: true, errorMessage: "Schema validation successful" };
}



