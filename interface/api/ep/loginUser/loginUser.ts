import { sendRequestAsync } from "../../common/sendRequestAsync";
import { check200, check401, Duration } from "../../common/checks";
import { LoginRequest } from "../../models/UserData";
import { schema } from "../../schemas/login";
import { getPublicHeader } from "../../common/headers";

export async function loginUser(
    credentials: LoginRequest,
    context: '200' | '401' = '200'
) {
    const endpoint = '/api/users/token/login';
    const method = 'POST';
    const headers = getPublicHeader();
    const body = credentials;

    const result = await sendRequestAsync(
        method,
        endpoint,
        headers,
        body
    );

    switch (context) {
        case '200':
            check200(result, schema, Duration.medium);
            break;
        case '401':
            check401(result);
            break;
    }

    return result;
}
