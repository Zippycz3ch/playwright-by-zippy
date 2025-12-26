import { schema } from "../../schemas/pizza";
import { sendRequestAsync } from "../../common/sendRequestAsync";
import { getRequestHeader } from "../../common/headers";
import { UserData } from "../../models/UserData";
import { PizzaRestrictions } from "../../models/PizzaRestrictions";
import { check200, check401, Duration } from "../../common/checks";

export async function postPizza(
    userData: UserData,
    restrictions?: PizzaRestrictions,
    context: '200' | '401' = '200'
) {
    const endpoint = 'api/pizza';
    const method = 'POST';
    const headers = getRequestHeader(userData);
    const body = restrictions || {};

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
