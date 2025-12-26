import { sendRequestAsync } from "../../../common/sendRequestAsync";
import { check201, Duration } from "../../../common/checks";

export interface CreateUserRequest {
    username: string;
    password: string;
}

export interface CreateUserResponse {
    id: number;
    username: string;
}

export async function createUser(userData: CreateUserRequest, context: '201' = '201') {
    const endpoint = '/api/users';
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    };
    const body = userData;

    const result = await sendRequestAsync(
        method,
        endpoint,
        headers,
        body
    );

    switch (context) {
        case '201':
            check201(result, undefined, Duration.medium);
            break;
    }

    return result;
}
