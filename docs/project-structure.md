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
