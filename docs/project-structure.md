# Project Structure

## Directory Organization

```
playwright-by-zippy/
├── docs/                          # Documentation files
├── tests/                         # Test suites organized by task
│   ├── 01_smoke/                  # Smoke tests
│   ├── 02_task01/                 # Mira AI agent tests
│   ├── 03_task02/                 # Live Chat tests
│   └── seed.spec.ts               # Test data setup
├── interface/                     # Page objects and API abstractions
│   └── ui/                        # Page Object Models
│       ├── loginpage.ts           # Login page interactions
│       ├── dashboardPage.ts       # Dashboard page interactions
│       ├── aiChatbotsPage.ts      # AI Chatbots page interactions
│       ├── aiAutomationsPage.ts   # AI Automations page interactions
│       ├── chatWidgetPage.ts      # Chat widget interactions
│       └── helpers/               # Shared helper functions
├── allure-results/                # Raw test result data
├── allure-report/                 # Generated HTML reports
├── playwright-report/             # Playwright HTML reports
├── test-results/                  # Screenshots, videos, traces
├── config.ts                      # Centralized configuration
├── playwright.config.ts           # Playwright configuration
├── .env                           # Environment variables (not in git)
└── package.json                   # Dependencies and scripts
```

## Configuration Files

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

### Config Structure (`config.ts`)

The `config.ts` file provides clean URL building:

- **Domain**: `smartsupp.com` (defined once)
- **Auth URL**: `https://openid.smartsupp.com`
- **App URL**: `https://app.smartsupp.com`

```typescript
export const getAuthBaseURL = () => `https://${process.env.SMARTSUPP_AUTH_SUBDOMAIN}.${process.env.SMARTSUPP_DOMAIN}`;

export const getAppBaseURL = () => `https://${process.env.SMARTSUPP_APP_SUBDOMAIN}.${process.env.SMARTSUPP_DOMAIN}`;
```

### Playwright Configuration (`playwright.config.ts`)

Key configuration options:

```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,

  reporter: [['line'], ['allure-playwright', { detail: true }]],

  use: {
    trace: 'on',
    video: 'on',
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: 'Smartsupp UI',
      testDir: './tests/01_smoke',
      use: { ...devices['Desktop Chrome'] },
    },
    // ... other projects
  ],
});
```

## Page Object Model Architecture

### Base Page Structure

```typescript
export class BasePage {
  constructor(protected page: Page) {}

  // Common page methods
  async navigate(url: string) {
    await this.page.goto(url);
  }
}
```

### Page-Specific Implementation

```typescript
export class LoginPage extends BasePage {
  // Locators
  get usernameInput() {
    return this.page.getByTestId('username');
  }

  // Actions
  async login(username: string, password: string) {
    await allure.step('Login with credentials', async () => {
      await this.usernameInput.fill(username);
      // ... more actions
    });
  }
}
```

### Helper Functions

Shared utilities in `interface/ui/helpers/`:

- `loginHelper.ts` - Common authentication flows
- `navigationHelper.ts` - Common navigation patterns
- `dataHelper.ts` - Test data management

## Test Organization

### Test Categories

- **Smoke Tests** (`01_smoke/`) - Critical path validation
- **Feature Tests** (`02_task01/`) - Specific feature testing
- **Integration Tests** (`03_task02/`) - End-to-end scenarios

### Naming Conventions

- Test files: `*.spec.ts`
- Page objects: `*Page.ts`
- Helpers: `*Helper.ts`
- Test data: `*.data.ts`

### Tags and Annotations

```typescript
test.describe('Feature Name', { tag: ['@smoke', '@critical'] }, () => {
  test('should perform action @regression', async ({ page }) => {
    // Test implementation
  });
});
```

## Dependencies

### Core Dependencies

- `@playwright/test` - Testing framework
- `allure-playwright` - Test reporting
- `dotenv` - Environment configuration
- `typescript` - Type safety

### Development Dependencies

- `@types/node` - TypeScript definitions
- Various Playwright browser engines

For more details, see [Installation Guide](installation.md).
