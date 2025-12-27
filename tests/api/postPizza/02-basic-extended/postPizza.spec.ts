import { test, expect } from '@playwright/test';
import { adminAccount } from '../../../../interface/api/common/accounts';
import { postPizza } from '../../../../interface/api/ep/pizza/postPizza';
import { PizzaResponse } from '../../../../interface/api/models/PizzaResponse';
import * as allure from 'allure-js-commons';

test.describe("POST /api/pizza", { tag: ["@api"] }, () => {
    test('Basic - POST /api/pizza returns pizza recommendation', async () => {
        await test.step('Send POST /api/pizza request without restrictions', async () => {
            await postPizza(adminAccount);
        });
    });

    test('Vegetarian - POST /api/pizza returns vegetarian pizza', async () => {
        const result = await test.step('Request vegetarian pizza', async () => {
            return await postPizza(adminAccount, {
                mustBeVegetarian: true
            });
        });

        await allure.step('Verify pizza is vegetarian', async () => {
            const data = result.data as PizzaResponse;
            expect(data.vegetarian, 'Pizza vegetarian flag should be true').toBe(true);
            data.pizza.ingredients.forEach((ingredient) => {
                expect(ingredient.vegetarian,
                    `Ingredient "${ingredient.name}" vegetarian flag should be true`
                ).toBe(true);
            });
        });
    });

    test('Calorie restriction - POST /api/pizza accepts calorie restriction parameter', async () => {
        const result = await test.step('Request pizza with max 300 calories per slice', async () => {
            return await postPizza(adminAccount, {
                maxCaloriesPerSlice: 300
            });
        });

        await allure.step('Verify calorie restriction is respected', async () => {
            const data = result.data as PizzaResponse;
            expect(data.calories, `Calories per slice (${data.calories}) should be <= 300`)
                .toBeLessThanOrEqual(300);
        });
    });

    test('Topping count - POST /api/pizza accepts topping count parameters', async () => {
        const result = await test.step('Request pizza with 3-4 toppings', async () => {
            return await postPizza(adminAccount, {
                minNumberOfToppings: 3,
                maxNumberOfToppings: 4
            });
        });

        await allure.step('Verify topping count is within range', async () => {
            const data = result.data as PizzaResponse;
            const toppingCount = data.pizza.ingredients.length;
            const toppingNames = data.pizza.ingredients.map(i => i.name).join(', ');

            expect(toppingCount, `Topping count (${toppingCount}) should be >= 3. Toppings: [${toppingNames}]`)
                .toBeGreaterThanOrEqual(3);
            expect(toppingCount, `Topping count (${toppingCount}) should be <= 4. Toppings: [${toppingNames}]`)
                .toBeLessThanOrEqual(4);
        });
    });

    test('Excluded ingredients - POST /api/pizza excludes specified ingredients', async () => {
        const excluded = ['anchovies', 'bacon'];
        const result = await test.step('Request pizza without anchovies and bacon', async () => {
            return await postPizza(adminAccount, {
                excludedIngredients: excluded
            });
        });

        await allure.step('Verify excluded ingredients are not present', async () => {
            const data = result.data as PizzaResponse;
            const ingredientNames = data.pizza.ingredients.map((ing) => ing.name.toLowerCase());

            excluded.forEach(excludedItem => {
                expect(ingredientNames,
                    `Ingredient "${excludedItem}" should NOT be present. Actual ingredients: [${ingredientNames.join(', ')}]`
                ).not.toContain(excludedItem.toLowerCase());
            });
        });
    });

    test('Excluded tools - POST /api/pizza excludes specified tools', async () => {
        const excludedTools = ['Wood Fired Oven'];
        const result = await test.step('Request pizza without specific tool', async () => {
            return await postPizza(adminAccount, {
                excludedTools: excludedTools
            });
        });

        await allure.step('Verify excluded tool is not used', async () => {
            const data = result.data as PizzaResponse;
            expect(excludedTools,
                `Tool "${data.pizza.tool}" should NOT be in excluded list: [${excludedTools.join(', ')}]`
            ).not.toContain(data.pizza.tool);
        });
    });

    test('Combined restrictions - POST /api/pizza accepts multiple restriction parameters', async () => {
        const result = await test.step('Request pizza with multiple restrictions', async () => {
            return await postPizza(adminAccount, {
                maxCaloriesPerSlice: 800,
                mustBeVegetarian: true,
                excludedIngredients: ['anchovies', 'bacon'],
                excludedTools: [],
                maxNumberOfToppings: 4,
                minNumberOfToppings: 2
            });
        });

        await allure.step('Verify combined restrictions are respected', async () => {
            const data = result.data as PizzaResponse;

            expect(data.vegetarian,
                'Pizza vegetarian flag should be true (combined restrictions)'
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
        });
    });
});
