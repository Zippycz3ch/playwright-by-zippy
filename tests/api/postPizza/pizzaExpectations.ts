import { PizzaRestrictions } from '../../../interface/api/models/PizzaRestrictions';

export interface PizzaTestCase {
    name: string;
    body?: PizzaRestrictions;
    expectedStatus: '200';
}

export const pizzaExpectations: PizzaTestCase[] = [
    { name: 'Basic - no restrictions', body: undefined, expectedStatus: '200' },
    { name: 'Vegetarian pizza', body: { mustBeVegetarian: true }, expectedStatus: '200' },
    { name: 'Calorie restriction', body: { maxCaloriesPerSlice: 300 }, expectedStatus: '200' },
    { name: 'Topping count parameters', body: { minNumberOfToppings: 3, maxNumberOfToppings: 4 }, expectedStatus: '200' },
    { name: 'Excluded ingredients', body: { excludedIngredients: ['anchovies', 'bacon'] }, expectedStatus: '200' },
    { name: 'Excluded tools', body: { excludedTools: ['Wood Fired Oven'] }, expectedStatus: '200' },
    { name: 'Combined restrictions', body: { maxCaloriesPerSlice: 800, mustBeVegetarian: true, excludedIngredients: ['anchovies', 'bacon'], excludedTools: [], maxNumberOfToppings: 4, minNumberOfToppings: 2 }, expectedStatus: '200' }
];
