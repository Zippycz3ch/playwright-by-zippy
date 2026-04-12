# 00_onboarding — Smartsupp Onboarding Tests

Tests covering the **initial onboarding flow** for a newly created Smartsupp account.

> ⚠️ These tests only work for an account that has **not yet completed onboarding**. Do not run against a already-configured account.

| File                                  | Description                                                       |
| ------------------------------------- | ----------------------------------------------------------------- |
| `00_userOnboardingToSmartupp.spec.ts` | Walks through the full Smartsupp onboarding wizard for a new user |

## Prerequisites

- A freshly created Smartsupp account with credentials in `.env` (`SMARTSUPP_USERNAME`, `SMARTSUPP_PASSWORD`)
- Account must **not** have completed onboarding previously

## Running These Tests

```bash
# Run all onboarding tests
npx playwright test tests/00_onboarding/ --headed

# Run specific test
npx playwright test tests/00_onboarding/00_userOnboardingToSmartupp.spec.ts --headed

# Run onboarding tests by tag
npx playwright test --grep "@onboarding" --headed
```
