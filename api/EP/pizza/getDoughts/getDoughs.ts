import { schema } from "../../../schemas/doughs";
import { sendRequestAsync } from "../../../helpers/sendRequestAsync";
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

    let checkResult;
    switch (context) {
        case '200':
            checkResult = check200(result, schema, Duration.short);
            break;
        case '401':
            checkResult = check401(result);
            break;
        case '403':
            checkResult = check403(result);
            break;
        default:
            throw new Error(`Unknown context: ${context}`);
    }

    if (!checkResult.passed) {
        throw new Error(`API validation failed:\n${checkResult.errors.join('\n')}`);
    }

    return result;
};
