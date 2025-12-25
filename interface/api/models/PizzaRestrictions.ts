export interface PizzaRestrictions {
    maxCaloriesPerSlice?: number;
    mustBeVegetarian?: boolean;
    excludedIngredients?: string[];
    excludedTools?: string[];
    maxNumberOfToppings?: number;
    minNumberOfToppings?: number;
}
