import { test, expect } from '@playwright/test';
import { adminAccount } from '../../interface/api/common/accounts';
import { postPizza } from '../../interface/api/ep/quickpizza/postPizza/postPizza';
import { PizzaResponse } from '../../interface/api/models/PizzaResponse';

test.describe("POST /api/pizza", { tag: ["@api"] }, () => {
    test('Basic - POST /api/pizza returns pizza recommendation', async () => {
        await test.step('Send POST /api/pizza request without restrictions', async () => {
            const result = await postPizza(adminAccount);

            expect(result.data).toHaveProperty('pizza');
            expect(result.data).toHaveProperty('calories');
            expect(result.data).toHaveProperty('vegetarian');
        });
    });

    test('Vegetarian - POST /api/pizza returns vegetarian pizza', async () => {
        await test.step('Request vegetarian pizza', async () => {
            const result = await postPizza(adminAccount, {
                mustBeVegetarian: true
            });
            const data = result.data as PizzaResponse;

            expect(data.vegetarian).toBe(true);

            // Verify all ingredients are vegetarian
            data.pizza.ingredients.forEach((ingredient) => {
                expect(ingredient.vegetarian).toBe(true);
            });
        });
    });

    test('Calorie restriction - POST /api/pizza accepts calorie restriction parameter', async () => {
        await test.step('Request pizza with max 300 calories per slice', async () => {
            const maxCalories = 300;
            const result = await postPizza(adminAccount, {
                maxCaloriesPerSlice: maxCalories
            });
            const data = result.data as PizzaResponse;

            // Verify response structure is valid
            expect(data.pizza).toBeDefined();
            expect(data.calories).toBeDefined();
        });
    });

    test('Topping count - POST /api/pizza accepts topping count parameters', async () => {
        await test.step('Request pizza with 3-4 toppings', async () => {
            const minToppings = 3;
            const maxToppings = 4;
            const result = await postPizza(adminAccount, {
                minNumberOfToppings: minToppings,
                maxNumberOfToppings: maxToppings
            });
            const data = result.data as PizzaResponse;

            // Verify response structure is valid
            expect(data.pizza.ingredients).toBeDefined();
            expect(data.pizza.ingredients.length).toBeGreaterThan(0);
        });
    });

    test('Excluded ingredients - POST /api/pizza excludes specified ingredients', async () => {
        await test.step('Request pizza without anchovies and bacon', async () => {
            const excluded = ['anchovies', 'bacon'];
            const result = await postPizza(adminAccount, {
                excludedIngredients: excluded
            });
            const data = result.data as PizzaResponse;

            const ingredientNames = data.pizza.ingredients
                .map((ing) => ing.name.toLowerCase());

            excluded.forEach(excludedItem => {
                expect(ingredientNames).not.toContain(excludedItem.toLowerCase());
            });
        });
    });

    test('Excluded tools - POST /api/pizza excludes specified tools', async () => {
        await test.step('Request pizza without specific tool', async () => {
            const excludedTools = ['Wood Fired Oven'];
            const result = await postPizza(adminAccount, {
                excludedTools: excludedTools
            });
            const data = result.data as PizzaResponse;

            expect(excludedTools).not.toContain(data.pizza.tool);
        });
    });

    test('Combined restrictions - POST /api/pizza accepts multiple restriction parameters', async () => {
        await test.step('Request pizza with multiple restrictions', async () => {
            const result = await postPizza(adminAccount, {
                maxCaloriesPerSlice: 800,
                mustBeVegetarian: true,
                excludedIngredients: ['anchovies', 'bacon'],
                excludedTools: [],
                maxNumberOfToppings: 4,
                minNumberOfToppings: 2
            });
            const data = result.data as PizzaResponse;

            // Verify vegetarian constraint is respected
            expect(data.vegetarian).toBe(true);

            // Verify response structure
            expect(data.pizza.ingredients.length).toBeGreaterThan(0);
            expect(data.calories).toBeDefined();
        });
    });
});

