import { sendRequestAsync } from "../../common/sendRequestAsync";
import { check200, check401, Duration } from "../../common/checks";

export interface LoginRequest {
    username: string;
    password: string;
    csrf?: string;
}

export interface LoginResponse {
    token: string;
}

export async function loginUser(
    credentials: LoginRequest,
    context: '200' | '401' = '200'
) {
    const endpoint = '/api/users/token/login';
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    };
    const body = credentials;

    const result = await sendRequestAsync(
        method,
        endpoint,
        headers,
        body
    );

    switch (context) {
        case '200':
            check200(result, undefined, Duration.medium);
            break;
        case '401':
            check401(result);
            break;
    }

    return result;
}
