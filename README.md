# Playwright by Zippy

Playwright test automation framework for [QuickPizza](https://quickpizza.grafana.com) API and UI testing. Integrates [Playwright Test Agents](https://playwright.dev/docs/test-agents) for AI test generation and [Playwright MCP Server](https://github.com/microsoft/playwright-mcp) for browser automation via Model Context Protocol.

**New to Playwright?** Start with this official introduction video:

<a href="https://www.youtube.com/watch?v=WvsLGZnHmzw">
  <img src="https://img.youtube.com/vi/WvsLGZnHmzw/maxresdefault.jpg" width="400" alt="Playwright Introduction">
</a>

## Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Java](https://ninite.com/adoptjavax17/) (for Allure reports)
- [VS Code](https://code.visualstudio.com/)
- [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [GitHub Copilot](https://github.com/features/copilot/plans) (free plan sufficient, required only for AI Agents and MCP - not for running tests)

## Installation

```bash
npm install
npx playwright install
```

## Technologies

- **Playwright** - Browser automation and testing
- **TypeScript** - Type-safe test development
- **Allure** - Test reporting
- **AJV** - JSON schema validation

## AI Integration

**[Playwright Test Agents](https://playwright.dev/docs/test-agents)** - AI agents generate, plan, and execute tests based on specifications in `specs/`. Generated tests compile to `tests/dist/`.

**[Playwright MCP Server](https://github.com/microsoft/playwright-mcp)** - Exposes browser automation through Model Context Protocol, enabling AI assistants to control browsers directly. Configuration: [.vscode/mcp.json](.vscode/mcp.json)

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

### Running Local QuickPizza

To run QuickPizza locally:

```bash
cd docker
docker compose up -d
```

This starts QuickPizza on `http://localhost:3333`.

## Test Coverage

**API Tests** (`tests/api/`)

- POST /api/pizza - Pizza generation with restrictions (standard & data-driven)
- Dough API validation
- Quotes API testing

**UI Tests** (`tests/ui/`)

- Pizza recommendation generation
- Advanced filtering
- User authentication
- Navigation and footer
- Homepage functionality
  **Scenario Tests** (`tests/scenarios/`)

- User registration and login (API + UI combined)
- Successful login with default and new users
- Failed login with invalid credentials
