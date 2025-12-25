export const schema = {
    type: "object",
    properties: {
        pizza: {
            type: "object",
            properties: {
                id: { type: "number" },
                name: { type: "string" },
                dough: {
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        name: { type: "string" },
                        caloriesPerSlice: { type: "number" }
                    },
                    required: ["name", "caloriesPerSlice"]
                },
                ingredients: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            caloriesPerSlice: { type: "number" },
                            vegetarian: { type: "boolean" }
                        },
                        required: ["name", "caloriesPerSlice", "vegetarian"]
                    }
                },
                tool: { type: "string" }
            },
            required: ["id", "name", "dough", "ingredients", "tool"]
        },
        calories: { type: "number" },
        vegetarian: { type: "boolean" }
    },
    required: ["pizza", "calories", "vegetarian"]
};
