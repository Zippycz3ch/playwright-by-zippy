# Playwright by Zippy

Playwright framework with progressive test patterns (basic to advanced). Tests [QuickPizza](https://quickpizza.grafana.com) using API, UI, data-driven patterns, and AI-powered generation with [Playwright Test Agents](https://playwright.dev/docs/test-agents) and [Playwright MCP Server](https://github.com/microsoft/playwright-mcp).

**New to Playwright?** Start with this official introduction video:

<a href="https://www.youtube.com/watch?v=WvsLGZnHmzw">
  <img src="https://img.youtube.com/vi/WvsLGZnHmzw/maxresdefault.jpg" width="400" alt="Playwright Introduction">
</a>

## Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Java](https://ninite.com/adoptjavax17/) (for Allure reports)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional, for local QuickPizza)
- [VS Code](https://code.visualstudio.com/)
- [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [GitHub Copilot](https://github.com/features/copilot/plans) (free plan sufficient, required for AI Agents and MCP only)

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

## AI Integration (Optional)

**[Playwright Test Agents](https://playwright.dev/docs/test-agents)** - Generate, plan, and execute tests from specifications in `specs/`.

```bash
npm install -D @playwright/test-agents
```

**[Playwright MCP Server](https://github.com/microsoft/playwright-mcp)** - Browser automation via Model Context Protocol for AI assistants.

Configuration in [.vscode/mcp.json](.vscode/mcp.json) - enables GitHub Copilot Chat to control browsers directly.

**Learn More:**

- [Playwright Test Agents Demo](https://www.youtube.com/watch?v=_AifxZGxwuk)
- [Playwright MCP Server Guide](https://www.youtube.com/watch?v=IixdI2bTR1g)

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
- `specs/` - Test specifications for AI agentsP
- `config.ts` - Environment configuration

## Running Tests

**Using Playwright VS Code Extension** (Recommended)

<a href="https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/13063165/330097103-400a3f11-a1e8-4fe7-8ae6-b0460142de35.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251227%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251227T153158Z&X-Amz-Expires=300&X-Amz-Signature=b4ffdd078546daad51569f33ac3dd502316a99710eb152de1b9872d0ca701078&X-Amz-SignedHeaders=host" width="300" alt="Playwright VS Code Extension">
</a>

[Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) features:

- Run tests with one click
- Debug with breakpoints
- Inline test results
- Record tests with Codegen

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

```bash
cd docker
docker compose up -d
```

Starts QuickPizza on `http://localhost:3333`.

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

- User registration and login (API + UI)
- Login with default and new users
- Failed login with invalid credentials
