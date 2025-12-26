// api/helpers/sendRequestAsync.ts
import * as allure from "allure-js-commons";
import { getBaseURL } from "../../../config";

export interface ApiResponse {
    response: Response;
    duration: number;
    data: unknown;
}

export async function sendRequestAsync(
    method: string,
    endpoint: string,
    headers: Record<string, string>,
    body?: unknown
): Promise<ApiResponse> {

    return await allure.step(`${method.toUpperCase()} ${endpoint}`, async (step) => {

        const baseUrl = getBaseURL();

        // You can use local quickpizza docker image for testing
        // cd docker
        // docker compose up -d
        // http://localhost:3333
        // or use deployed version https://quickpizza.grafana.com
        let url: string;
        if (endpoint.startsWith("http") || endpoint.startsWith("https")) {
            url = endpoint;
        } else {
            url = baseUrl + (endpoint.startsWith("/") ? endpoint : "/" + endpoint);
        }

        step.parameter("URL", url);
        step.parameter("Method", method);
        if (body) {
            step.parameter("Body", JSON.stringify(body, null, 2));
        }

        const start = Date.now();
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined
        });
        const duration = Date.now() - start;

        const rawText = await response.text();
        let parsedData: unknown;
        try {
            parsedData = JSON.parse(rawText);
        } catch {
            parsedData = rawText;
        }

        step.parameter("Status", response.status.toString());
        step.parameter("Duration", `${duration}ms`);
        if (parsedData && typeof parsedData === 'object') {
            step.parameter("Response", JSON.stringify(parsedData, null, 2));
        }

        return {
            response,
            duration,
            data: parsedData
        };

    });

}
