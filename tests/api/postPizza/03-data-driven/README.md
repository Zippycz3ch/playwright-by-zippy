# 03-data-driven

Data-driven tests using external test case definitions.

## What's included

- `pizzaExpectations.ts` - Test case definitions with validation logic
- `postPizzaDataDriven.spec.ts` - Generic test runner

Each test case includes:

- Request body (restrictions)
- Expected status code
- Optional validation function

## Purpose

**Level 3: Data-Driven Testing Pattern**

Demonstrates Playwright's power for parameterized testing using external test data. Shows advanced test organization:

- Separation of test data from test execution logic
- Loop-based test generation from data arrays
- Reusable validation functions
- Scalable approach for testing multiple scenarios
- Demonstrates Playwright's flexibility with TypeScript structures

## Adding new tests

Add to `pizzaExpectations` array in `pizzaExpectations.ts`:

```typescript
{
    name: 'Your test name',
    body: { /* restrictions */ },
    expectedStatus: '200',
    validate: (data) => { /* assertions */ }
}
```
