// api/helpers/sendRequestAsync.ts
import * as allure from "allure-js-commons";

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

    return await allure.step(`${method.toUpperCase()} -> ${endpoint}`, async () => {


        // You can use local quickpizza docker image for testing
        // cd docker
        // docker compose up -d
        // http://localhost:3333
        // or use deployed version https://quickpizza.grafana.com
        let url: string;
        if (endpoint.startsWith("http") || endpoint.startsWith("https")) {
            url = endpoint;
        } else {
            url = "https://quickpizza.grafana.com" + (endpoint.startsWith("/") ? endpoint : "/" + endpoint);
        }

        await allure.step("Request", async (step) => {

            step.parameter("Url", url);
            step.parameter("Headers", JSON.stringify(headers, null, 10));
            step.parameter("Method", method);
            step.parameter("Body", JSON.stringify(body, null, 10));

        })

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

        await allure.step("Response", async (step) => {
            step.parameter("Status", response.status.toString());
            step.parameter("Headers", JSON.stringify(Object.fromEntries(response.headers), null, 10));
            step.parameter("Duration", `${duration} ms`);
            step.parameter("Body", JSON.stringify(parsedData));
        })

        return {
            response,
            duration,
            data: parsedData
        };

    });

}
