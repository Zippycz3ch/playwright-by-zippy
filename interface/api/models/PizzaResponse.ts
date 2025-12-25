export interface Ingredient {
    id: number;
    name: string;
    caloriesPerSlice: number;
    vegetarian: boolean;
}

export interface PizzaResponse {
    pizza: {
        id: number;
        name: string;
        dough: {
            id: number;
            name: string;
            caloriesPerSlice: number;
        };
        ingredients: Ingredient[];
        tool: string;
    };
    calories: number;
    vegetarian: boolean;
}
