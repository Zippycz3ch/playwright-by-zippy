export const schema = {
    type: "object",
    properties: {
        quotes: {
            type: "array",
            items: {
                type: "string"
            }
        }
    },
    required: ["quotes"]
};
