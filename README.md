# Playwright by Zippy

A Playwright test automation framework for API and UI testing.

## Project Structure

- `tests/` - Test files (API and UI tests)
- `api/` - API endpoint definitions and helpers
- `interface/` - Page objects and API interfaces
- `specs/` - Test specifications for agents
- `tests/dist` - Compiled test files for agents

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

Run specific project tests:

```bash
npm run test -- --project=UI
npm run test -- --project=API
```

The `pretest` script automatically compiles TypeScript files before running tests.

## Environment Configuration

The project uses a `.env` file to switch between environments. Edit the `.env` file to change the target environment:

```bash
# For production (default)
ENV=PROD

# For local development
ENV=LOCAL
```

**Available Environments:**

- `PROD` - https://quickpizza.grafana.com
- `LOCAL` - http://localhost:3333 (requires Docker container)

All URLs are centrally managed in [config.ts](config.ts).

## Technologies

- Playwright - Browser automation and testing
- TypeScript - Type-safe test development
- Allure - Test reporting
- AJV - JSON schema validation

## Test Types

- **API Tests** - Located in `tests/api/`
  - Dough API tests
  - Quotes API tests
- **UI Tests** - Located in `tests/ui/`
  - Pizza recommendation generation
  - Advanced filtering options
  - User authentication flows
  - Navigation and footer links
  - QuickPizza homepage functionality

## Configuration

- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript compiler settings
