# 01-basic

Simple smoke test using helper functions.

## What's included

- Single test: POST /api/pizza without restrictions
- Uses `postPizza` helper function
- Schema validation handled automatically
- Minimal assertions - just verifies the endpoint works

## Purpose

**Level 1: Helper Function Abstraction**

Demonstrates using Playwright with custom helper functions to simplify test code. Shows progression from raw implementation to reusable abstractions:

- Encapsulated API calls with `postPizza` helper
- Automatic schema validation
- Consistent error handling
- Cleaner, more maintainable test code
- Focus on "what to test" rather than "how to test"
