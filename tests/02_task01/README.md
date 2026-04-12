# 02_task01 — Mira AI Agent Tests

End-to-end tests for the **Mira AI** agent feature in [Smartsupp](https://app.smartsupp.com).

Tests are prefixed with a number indicating the intended run order.

| File                            | Description                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `00_mira-ai-onboarding.spec.ts` | Creates a new Mira AI agent via the onboarding wizard and verifies it appears in the list               |
| `01_mira-ai-behavior.spec.ts`   | Edits behavior sliders (tone, talkativeness, confidence, emoji), publishes, and verifies values persist |
| `02_mira-ai-handover.spec.ts`   | Toggles the handover-to-operator setting both ways and verifies the change persists after publish       |
| `03_mira-ai-language.spec.ts`   | Changes the welcome message language to Czech, publishes, and verifies the selected language persists   |
| `04_mira-ai-delete.spec.ts`     | Deletes the existing Mira AI agent and verifies no agents remain                                        |
| `05_mira-ai-E2E.spec.ts`        | Full lifecycle E2E: create → behavior → handover → language → delete                                    |

## Tags

| Tag           | Meaning                                    |
| ------------- | ------------------------------------------ |
| `@scenario`   | Full user-facing scenario test             |
| `@mira-ai`    | Targets Mira AI agent functionality        |
| `@onboarding` | Covers the onboarding/creation flow        |
| `@settings`   | Covers agent settings (behavior, language) |
| `@handover`   | Covers handover-to-operator settings       |
| `@delete`     | Covers agent deletion                      |
| `@e2e`        | End-to-end flow spanning multiple steps    |

## Prerequisites

- A valid Smartsupp account with credentials set in `.env` (`SMARTSUPP_USERNAME`, `SMARTSUPP_PASSWORD`)
- Tests `01`–`04` expect an existing Mira AI agent to be present (run `00` first)
- `05_mira-ai-E2E.spec.ts` expects a clean state with no existing agent (same as `00`)

## Running These Tests

```bash

# Run all task01 tests except the E2E test (requires existing agent from run 00)
npx playwright test "tests/02_task01/0[0-4]_*"

# Run specific tests (in order)
npx playwright test tests/02_task01/00_mira-ai-onboarding.spec.ts --headed
npx playwright test tests/02_task01/01_mira-ai-behavior.spec.ts --headed
npx playwright test tests/02_task01/02_mira-ai-handover.spec.ts --headed
npx playwright test tests/02_task01/03_mira-ai-language.spec.ts --headed
npx playwright test tests/02_task01/04_mira-ai-delete.spec.ts --headed

# Run full lifecycle E2E test (standalone, no prerequisites)
npx playwright test tests/02_task01/05_mira-ai-E2E.spec.ts --headed

# Run by tag
npx playwright test --grep "@mira-ai" --headed
```

> **Note:** These tests are numbered and should be run in series (workers=1) to maintain proper test order.
