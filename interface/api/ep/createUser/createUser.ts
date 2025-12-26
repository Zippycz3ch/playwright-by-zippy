import { sendRequestAsync } from "../../common/sendRequestAsync";
import { check201, check400, check401, check403, Duration } from "../../common/checks";
import { schema } from "../../schemas/user";
import { CreateUserRequest, CreateUserResponse } from "../../models/UserData";
import { getPublicHeader } from "../../common/headers";

export async function createUser(userData: CreateUserRequest, context: '201' | '400' | '401' | '403' | '500' = '201') {
    const endpoint = '/api/users';
    const method = 'POST';
    const headers = getPublicHeader();
    const body = userData;

    const result = await sendRequestAsync(
        method,
        endpoint,
        headers,
        body
    );

    switch (context) {
        case '201':
            check201(result, schema, Duration.medium);
            break;
        case '400':
            check400(result);
            break;
        case '401':
            check401(result);
            break;
        case '403':
            check403(result);
            break;
        case '500':
            // Server error - no specific validation, just return result
            // This case documents server crash scenarios (e.g., very long password)
            break;
    }

    return result;
}
