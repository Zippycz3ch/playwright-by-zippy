import { schema } from "../../../schemas/quotes";
import { sendRequestAsync } from "../../../helpers/sendRequestAsync";
import { getRequestHeader } from "../../../common/headers";
import { UserData } from "../../../models/UserData";
import { check200, Duration } from "../../../common/checks";

export async function getQuotes(userData: UserData) {
    const endpoint = 'api/quotes';
    const method = 'GET';
    const headers = getRequestHeader(userData);
    const body = undefined;

    const result = await sendRequestAsync(
        method,
        endpoint,
        headers,
        body
    );

    const checkResult = check200(result, schema, Duration.short);
    if (!checkResult.passed) {
        throw new Error(`API validation failed:\n${checkResult.errors.join('\n')}`);
    }

    return result;
};
