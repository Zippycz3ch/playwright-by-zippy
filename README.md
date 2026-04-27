# Playwright by Zippy

Playwright test automation framework with TypeScript, featuring Smartsupp application testing with clean Page Object Model architecture.

**New to Playwright?** Start with this official introduction video:

<a href="https://www.youtube.com/watch?v=WvsLGZnHmzw">
  <img src="https://img.youtube.com/vi/WvsLGZnHmzw/maxresdefault.jpg" width="400" alt="Playwright Introduction">
</a>

## Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Java](https://ninite.com/adoptjavax17/) (for Allure reports)
- [VS Code](https://code.visualstudio.com/)
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

- `tests/` - Test files organized by type
  - `ui/` - UI automation tests with Page Object Model
    - `login.spec.ts` - Login functionality tests
    - `dashboard.spec.ts` - Dashboard navigation tests
  - `api/` - API integration tests
    - `user/` - User management and authentication
  - `scenarios/` - End-to-end workflow tests
- `interface/` - Page objects and API abstractions
  - `ui/` - Page Object Models
    - `loginPage.ts` - Login page POM
    - `dashboardPage.ts` - Dashboard page POM
    - `aiChatbotsPage.ts` - AI Chatbots management POM
    - `aiOnboardingPage.ts` - AI Onboarding/tutorials POM
  - `api/` - API endpoints, models, schemas, and helpers
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
[Install Allure reports](https://allurereport.org/docs/v2/install-for-nodejs/)

View detailed Allure reports with hierarchical step organization:

```bash
npm install -g allure-commandline
```

check version
```bash
allure --version
```

Generate reports
```bash
allure serve
```

Features:
- Nested `allure.step()` descriptions
- Detailed test execution flow
- Screenshots and traces on failure
- Timeline and trend analysis

## Test Coverage

**UI Tests** (`tests/ui/`)

- **Login Tests** (`login.spec.ts`)
  - Successful login with valid credentials
  - Invalid credentials error validation
  - Keycloak authentication integration

- **Dashboard Tests** (`dashboard.spec.ts`)
  - Dashboard page load verification
  - Navigation sidebar validation
  - Settings page navigation
  - Customers page navigation

**Page Object Models** (`interface/ui/`)

- **LoginPage** - Keycloak authentication page
  - Username/password input
  - Sign in action
  - Error message validation
  
- **DashboardPage** - Main dashboard navigation
  - Home, Inbox, AI Automations, Automations
  - Customers, Statistics, Settings
  - Trial banner elements
  
- **AiChatbotsPage** - AI assistants management
  - Task completion tracking
  - Summary statistics
  - AI assistants table (CRUD operations)
  
- **AiOnboardingPage** - Educational tutorials
  - Navigation tabs (AI Assistants, Sources, Satisfaction, Training)
  - Video tutorial sections

**Test Design Patterns**

- Clean Page Object Model architecture
- Integrated `navigate()` methods with verification
- Verbose Allure reporting with nested steps
- Environment-based configuration
- Reusable locators with type safety

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
