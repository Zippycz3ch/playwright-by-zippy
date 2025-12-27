# 02-basic-extended

Extended test suite covering all pizza restriction parameters.

## What's included

Tests for all restriction parameters:

- Basic (no restrictions)
- Vegetarian constraint
- Calorie restriction
- Topping count parameters
- Excluded ingredients
- Excluded tools
- Combined restrictions

Each test includes explicit validation of the constraint being tested.

## Purpose

**Level 2: Explicit Validation Patterns**

Demonstrates Playwright tests with detailed business logic validation on top of helper functions. Shows how to combine helpers with explicit assertions:

- Uses helper functions for API calls
- Adds custom validation steps for business rules
- Clear separation between "making requests" and "verifying results"
- Detailed assertion messages for debugging
- Allure steps showing both technical and business validation
