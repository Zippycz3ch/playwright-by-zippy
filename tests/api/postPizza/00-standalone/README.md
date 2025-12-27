# 00-standalone

Fully self-contained test with everything inline - no external helpers or abstractions.

## What's included

- Raw fetch request with manual URL construction
- Inline header setup and authentication
- Direct response parsing
- Direct status code verification
- Response time assertion
- Complete JSON schema validation with AJV
- Allure step structure

## Purpose

**Level 0: Raw Playwright API Testing**

Demonstrates the foundational level of Playwright - using native JavaScript/TypeScript features (fetch, JSON parsing) with Playwright's test runner and assertions. Shows the complete API testing flow without any custom abstractions:

- Pure Playwright test structure with `test.describe` and `test.step`
- Manual request construction and response handling
- Direct use of Playwright's `expect` assertions
- Allure reporting integration
- Complete visibility into every step of the request/response cycle
