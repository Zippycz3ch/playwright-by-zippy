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
