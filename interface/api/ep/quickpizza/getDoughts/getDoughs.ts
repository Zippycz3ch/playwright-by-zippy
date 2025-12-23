import { schema } from "../../../schemas/doughs";
import { sendRequestAsync } from "../../../common/sendRequestAsync";
import { getRequestHeader } from "../../../common/headers";
import { UserData } from "../../../models/UserData";
import { check200, check401, check403, Duration } from "../../../common/checks";

export async function getDoughs(userData: UserData, context: '200' | '401' | '403' = '200') {
    const endpoint = 'api/doughs';
    const method = 'GET';
    const headers = getRequestHeader(userData);
    const body = undefined;

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
        case '403':
            check403(result);
            break;
    }

    return result;
};
