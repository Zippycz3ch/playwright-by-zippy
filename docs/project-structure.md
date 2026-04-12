# Project Structure

## Directory Organization

```
playwright-by-zippy/
├── docs/                               # Documentation files
├── tests/                              # Test suites organized by task
│   ├── 00_onboarding/                  # User onboarding to Smartsupp
│   ├── 01_smoke/                       # Smoke tests
│   ├── 02_task01/                      # Mira AI agent tests
│   │   ├── 00_mira-ai-onboarding.spec.ts
│   │   ├── 01_mira-ai-behavior.spec.ts
│   │   ├── 02_mira-ai-handover.spec.ts
│   │   ├── 03_mira-ai-language.spec.ts
│   │   ├── 04_mira-ai-on-and-of-dashboard.spec.ts
│   │   ├── 05_mira-ai-delete.spec.ts
│   │   ├── 06_mira-ai-E2E.spec.ts
│   │   └── E2Eresults/                 # Saved passing E2E run (video, trace, result)
│   └── 03_task02/                      # Live Chat tests
├── interface/                          # Page objects and API abstractions
│   └── ui/                             # Page Object Models
│       ├── loginPage.ts
│       ├── dashboardPage.ts
│       ├── aiChatbotsPage.ts
│       ├── aiAutomationsPage.ts
│       ├── chatWidgetPage.ts
│       ├── conversationPage.ts
│       ├── multichannelOnboardingPage.ts
│       └── helpers/                    # Shared helper functions
├── allure-results/                     # Raw test result data
├── allure-report/                      # Generated HTML reports
├── playwright-report/                  # Playwright HTML reports
├── test-results/                       # Screenshots, videos, traces
├── config.ts                           # Centralized configuration
├── playwright.config.ts                # Playwright configuration
├── .env                                # Environment variables (not in git)
└── package.json                        # Dependencies and scripts
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
