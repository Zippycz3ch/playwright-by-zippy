# Playwright by Zippy

A Playwright test automation framework for API and UI testing.

## Project Structure

- `tests/` - Test files (API and UI tests)
- `api/` - API endpoint definitions and helpers
- `interface/` - Page objects and API interfaces
- `specs/` - Test specifications

## Prerequisites

- Node.js
- npm

## Installation

```bash
npm install
```

## Running Tests

Run all tests:

```bash
npm run test
```

The `pretest` script automatically compiles TypeScript files before running tests.

## Technologies

- Playwright - Browser automation and testing
- TypeScript - Type-safe test development
- Allure - Test reporting
- AJV - JSON schema validation

## Test Types

- **API Tests** - Located in `tests/api/`
- **UI Tests** - Located in `tests/ui/`

## Configuration

- `playwright.config.ts` - Playwright configuration
- `tests/tsconfig.json` - TypeScript compiler settings
