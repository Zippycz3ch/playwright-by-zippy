import { API_URLS } from "./config";

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

    const env = process.env.ENV as keyof typeof API_URLS || "PROD";
    const baseUrl = API_URLS[env];

    let url: string;
    if (endpoint.startsWith("http") || endpoint.startsWith("https")) {
        url = endpoint;
    } else {
        url = baseUrl + (endpoint.startsWith("/") ? endpoint : "/" + endpoint);
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

    return {
        response,
        duration,
        data: parsedData
    };
}
