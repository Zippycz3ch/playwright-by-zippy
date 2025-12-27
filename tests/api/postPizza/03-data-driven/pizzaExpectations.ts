import { PizzaRestrictions } from '../../../../interface/api/models/PizzaRestrictions';
import { PizzaResponse } from '../../../../interface/api/models/PizzaResponse';
import { expect } from '@playwright/test';

export interface PizzaTestCase {
    name: string;
    body?: PizzaRestrictions;
    expectedStatus: '200';
    validate?: (data: PizzaResponse) => void;
}

export const pizzaExpectations: PizzaTestCase[] = [
    {
        name: 'Basic - no restrictions',
        body: undefined,
        expectedStatus: '200'
    },
    {
        name: 'Vegetarian pizza',
        body: { mustBeVegetarian: true },
        expectedStatus: '200',
        validate: (data) => {
            expect(data.vegetarian, `Pizza vegetarian flag should be true`).toBe(true);
            data.pizza.ingredients.forEach((ingredient) => {
                expect(ingredient.vegetarian,
                    `Ingredient "${ingredient.name}" vegetarian flag should be true`
                ).toBe(true);
            });
        }
    },
    {
        name: 'Calorie restriction',
        body: { maxCaloriesPerSlice: 300 },
        expectedStatus: '200',
        validate: (data) => {
            expect(data.calories,
                `Calories per slice (${data.calories}) should be <= 300`
            ).toBeLessThanOrEqual(300);
        }
    },
    {
        name: 'Topping count parameters',
        body: { minNumberOfToppings: 3, maxNumberOfToppings: 4 },
        expectedStatus: '200',
        validate: (data) => {
            const toppingCount = data.pizza.ingredients.length;
            const toppingNames = data.pizza.ingredients.map(i => i.name).join(', ');
            expect(toppingCount,
                `Topping count (${toppingCount}) should be >= 3. Toppings: [${toppingNames}]`
            ).toBeGreaterThanOrEqual(3);
            expect(toppingCount,
                `Topping count (${toppingCount}) should be <= 4. Toppings: [${toppingNames}]`
            ).toBeLessThanOrEqual(4);
        }
    },
    {
        name: 'Excluded ingredients',
        body: { excludedIngredients: ['anchovies', 'bacon'] },
        expectedStatus: '200',
        validate: (data) => {
            const ingredientNames = data.pizza.ingredients.map((ing) => ing.name.toLowerCase());
            const excluded = ['anchovies', 'bacon'];
            excluded.forEach(excludedItem => {
                expect(ingredientNames,
                    `Ingredient "${excludedItem}" should NOT be present. Actual ingredients: [${ingredientNames.join(', ')}]`
                ).not.toContain(excludedItem.toLowerCase());
            });
        }
    },
    {
        name: 'Excluded tools',
        body: { excludedTools: ['Wood Fired Oven'] },
        expectedStatus: '200',
        validate: (data) => {
            const excludedTools = ['Wood Fired Oven'];
            expect(excludedTools,
                `Tool "${data.pizza.tool}" should NOT be in excluded list: [${excludedTools.join(', ')}]`
            ).not.toContain(data.pizza.tool);
        }
    },
    {
        name: 'Combined restrictions',
        body: { maxCaloriesPerSlice: 800, mustBeVegetarian: true, excludedIngredients: ['anchovies', 'bacon'], excludedTools: [], maxNumberOfToppings: 4, minNumberOfToppings: 2 },
        expectedStatus: '200',
        validate: (data) => {
            expect(data.vegetarian,
                `Pizza vegetarian flag should be true (combined restrictions)`
            ).toBe(true);
            expect(data.calories,
                `Calories per slice (${data.calories}) should be <= 800 (combined restrictions)`
            ).toBeLessThanOrEqual(800);
            const toppingCount = data.pizza.ingredients.length;
            const toppingNames = data.pizza.ingredients.map(i => i.name).join(', ');
            expect(toppingCount,
                `Topping count (${toppingCount}) should be >= 2 (combined restrictions). Toppings: [${toppingNames}]`
            ).toBeGreaterThanOrEqual(2);
            expect(toppingCount,
                `Topping count (${toppingCount}) should be <= 4 (combined restrictions). Toppings: [${toppingNames}]`
            ).toBeLessThanOrEqual(4);
        }
    }
];
