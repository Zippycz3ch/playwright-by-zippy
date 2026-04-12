# Playwright

## Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Java](https://ninite.com/adoptjavax17/) (for Allure reports)
- [VS Code](https://code.visualstudio.com/) (for Playwright Test for VS Code, optional but recommended)
- [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## Installation

```bash
npm install
npx playwright install
```

## Technologies

- **Playwright** - Browser automation and testing
- **TypeScript** - Type-safe test development
- **Allure** - Test reporting with hierarchical steps
- **AJV** - JSON schema validation
- **Dotenv** - Environment configuration

## Project Structure

- `tests/` - Test suites organized by task
  - `02_task01/` - Mira AI agent tests
  - `03_task02/` - Live Chat operator ↔ visitor tests
- `interface/` - Page objects and API abstractions
  - `ui/` - Page Object Models (LoginPage, DashboardPage, AiChatbotsPage, AiOnboardingPage, ChatWidgetPage)
- `config.ts` - Centralized configuration with domain/subdomain structure
- `.env` - Environment variables (credentials, URLs)

## Configuration

### Environment Variables (`.env`)

```bash
# Smartsupp configuration
SMARTSUPP_DOMAIN=smartsupp.com
SMARTSUPP_AUTH_SUBDOMAIN=openid
SMARTSUPP_APP_SUBDOMAIN=app

# Smartsupp credentials
SMARTSUPP_USERNAME=your-email@example.com
SMARTSUPP_PASSWORD=your-password
```

### Config Structure

The `config.ts` file provides clean URL building:

- **Domain**: `smartsupp.com` (defined once)
- **Auth URL**: `https://openid.smartsupp.com`
- **App URL**: `https://app.smartsupp.com`

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

# UI tests only
npm run test -- --project=UI

# API tests only
npm run test -- --project=API

# Specific test file
npm run test -- tests/ui/login.spec.ts

# With Allure reporter
npm run test -- --reporter=allure-playwright
```

## Test Reports

View detailed Allure reports with hierarchical step organization:

```bash
allure serve
```

Features:

- Nested `allure.step()` descriptions
- Detailed test execution flow
- Screenshots and traces on failure
- Timeline and trend analysis

## Test Suites

**02_task01 — Mira AI Agent** ([`tests/02_task01/`](tests/02_task01/README.md))

- Creates a Mira AI agent via the onboarding wizard
- Edits behavior sliders (tone, talkativeness, confidence, emoji)
- Toggles handover-to-operator setting
- Changes welcome message language
- Deletes the agent and verifies removal

**03_task02 — Live Chat** ([`tests/03_task02/`](tests/03_task02/README.md))

- Visitor sends a text message; operator receives it in the inbox
- Visitor sends a file attachment; operator verifies it in the conversation
- Operator replies to a visitor; visitor receives the response in the chat widget

Manual test cases:

- [`tests/03_task02/testCases/visitor-test-cases.md`](tests/03_task02/testCases/visitor-test-cases.md)
- [`tests/03_task02/testCases/operator-test-cases.md`](tests/03_task02/testCases/operator-test-cases.md)

## Development

### Running Tests

```bash
# Run all UI tests
npm run test -- --project=UI

# Run specific test file
npm run test -- tests/ui/login.spec.ts

# Run tests with UI mode
npx playwright test --ui

# Run tests in headed mode
npx playwright test --headed
```

### Debugging

```bash
# Debug mode
npx playwright test --debug

# Generate trace
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip
```

## Contributing

1. Create feature branch
2. Write tests with Page Object Model pattern
3. Add verbose Allure steps for reporting
4. Ensure all tests pass
5. Commit and push
6. Create pull request

## License

ISC
