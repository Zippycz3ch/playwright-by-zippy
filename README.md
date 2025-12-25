# Playwright by Zippy

Playwright test automation framework for [QuickPizza](https://quickpizza.grafana.com) API and UI testing. Integrates [Playwright Test Agents](https://playwright.dev/docs/test-agents) for AI test generation and [Playwright MCP Server](https://github.com/microsoft/playwright-mcp) for browser automation via Model Context Protocol.

**New to Playwright?** Start with this [official introduction video](https://www.youtube.com/watch?v=WvsLGZnHmzw).

## Prerequisites

- Node.js & npm
- Java (for Allure reports)
- VS Code
- [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [GitHub Copilot](https://github.com/features/copilot/plans) (free plan sufficient, required only for AI Agents and MCP - not for running tests)

## Installation

```bash
npm install
npx playwright install
```

## Project Structure

- `tests/` - API and UI test files
- `interface/` - Page objects and API interfaces
- `specs/` - Test specifications for AI agents
- `tests/dist` - Agent-generated compiled tests
- `api/` - API endpoint definitions

## Running Tests

```bash
# All tests
npm run test

# Specific project
npm run test -- --project=UI
npm run test -- --project=API
```

TypeScript files are automatically compiled via `pretest` script.

## Test Reports

```bash
allure serve
```

## Environment Configuration

Switch environments via `.env` file:

```bash
ENV=PROD   # https://quickpizza.grafana.com (default)
ENV=LOCAL  # http://localhost:3333 (requires Docker)
```

URLs managed in [config.ts](config.ts).

## Technologies

- **Playwright** - Browser automation and testing
- **TypeScript** - Type-safe test development
- **Allure** - Test reporting
- **AJV** - JSON schema validation

## AI Integration

**Playwright Test Agents** - AI agents generate, plan, and execute tests based on specifications in `specs/`. Generated tests compile to `tests/dist/`.

**Playwright MCP Server** - Exposes browser automation through Model Context Protocol, enabling AI assistants to control browsers directly. Configuration: [.vscode/mcp.json](.vscode/mcp.json)

## Test Coverage

**API Tests** (`tests/api/`)

- Dough API validation
- Quotes API testing

**UI Tests** (`tests/ui/`)

- Pizza recommendation generation
- Advanced filtering
- User authentication
- Navigation and footer
- Homepage functionality
