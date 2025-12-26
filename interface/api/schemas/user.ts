export const schema = {
    type: "object",
    properties: {
        id: { type: "number" },
        username: { type: "string" }
    },
    required: ["id", "username"]
};
