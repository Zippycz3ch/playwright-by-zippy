export const schema = {
    "type": "object",
    "properties": {
        "doughs": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "ID": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "caloriesPerSlice": {
                        "type": "integer"
                    }
                },
                "required": ["ID", "name", "caloriesPerSlice"]
            },
            "minItems": 1
        }
    },
    "required": ["doughs"]
}
