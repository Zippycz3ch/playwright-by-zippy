# 04-negative

Negative test cases for error scenarios.

## What's included

Tests for unauthorized access (401):

- No credentials with no restrictions
- No credentials with vegetarian restriction
- No credentials with calorie restriction

## Purpose

**Level 4: Negative Testing & Error Handling**

Demonstrates Playwright testing patterns for error scenarios and security validation. Shows how to test failure paths:

- Testing expected failures (401 Unauthorized)
- Validating error response structures
- Security testing with invalid credentials
- Using context parameters to test different response codes
- Demonstrates Playwright's capability for comprehensive API testing beyond happy paths
