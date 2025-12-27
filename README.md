# Playwright by Zippy

Comprehensive Playwright test automation framework showcasing progressive implementation patterns from basic to advanced. Demonstrates testing the [QuickPizza](https://quickpizza.grafana.com) application with API testing, UI automation, data-driven patterns, and AI-powered test generation using [Playwright Test Agents](https://playwright.dev/docs/test-agents) and [Playwright MCP Server](https://github.com/microsoft/playwright-mcp).

**New to Playwright?** Start with this official introduction video:

<a href="https://www.youtube.com/watch?v=WvsLGZnHmzw">
  <img src="https://img.youtube.com/vi/WvsLGZnHmzw/maxresdefault.jpg" width="400" alt="Playwright Introduction">
</a>

## Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Java](https://ninite.com/adoptjavax17/) (for Allure reports)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional, for running QuickPizza locally)
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

- `tests/` - Test files organized by type and complexity
  - `api/postPizza/` - Progressive API test examples (5 levels)
  - `api/user/` - User management tests
  - `api/quotes/` - Quotes API tests
  - `api/doughs/` - Dough API tests
  - `ui/` - UI automation tests
  - `scenarios/` - End-to-end workflow tests
- `interface/` - Page objects and API helper functions
  - `api/` - API endpoints, models, schemas, and helpers
  - `ui/` - Page Object Models for UI testing
- `specs/` - Test specifications for AI agents
- `config.ts` - Environment configuration

## Running Tests

**Using Playwright VS Code Extension** (Recommended)

<a href="https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/13063165/330097103-400a3f11-a1e8-4fe7-8ae6-b0460142de35.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251227%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251227T153158Z&X-Amz-Expires=300&X-Amz-Signature=b4ffdd078546daad51569f33ac3dd502316a99710eb152de1b9872d0ca701078&X-Amz-SignedHeaders=host" width="300" alt="Playwright VS Code Extension">
</a>

Use the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension to run, debug, and manage tests directly from the editor with features like:

- Run tests with a single click from the sidebar or code
- Debug tests with breakpoints
- View test results inline
- Record new tests with Codegen

**Using Command Line**

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

**POST /api/pizza** - Progressive test implementation levels:

- `00-standalone/` - Raw Playwright without abstractions
- `01-basic/` - Helper function usage
- `02-basic-extended/` - Explicit validation patterns
- `03-data-driven/` - Parameterized testing
- `04-negative/` - Error handling & security

**Other API Tests:**

- User creation and authentication
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
