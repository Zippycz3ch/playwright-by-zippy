# 01_smoke — Smartsupp Smoke Tests

Quick sanity checks for **core Smartsupp UI** — login and dashboard navigation. Run these first to confirm the app is up and accessible before running deeper test suites.

| File                          | Description                                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `smartsupp-login.spec.ts`     | Verifies login with valid credentials succeeds and invalid credentials show an error               |
| `smartsupp-dashboard.spec.ts` | Verifies the dashboard loads after login and that key sections (settings, customers) are navigable |

## Tags

| Tag          | Meaning                                |
| ------------ | -------------------------------------- |
| `@smoke`     | Fast sanity check — should always pass |
| `@login`     | Covers authentication flow             |
| `@dashboard` | Covers dashboard navigation            |

## Prerequisites

- Valid Smartsupp credentials in `.env` (`SMARTSUPP_USERNAME`, `SMARTSUPP_PASSWORD`)
