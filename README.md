# Playwright Test Automation Framework

A test automation suite for Smartsupp platform using Playwright, TypeScript, and Allure reporting.

## Documentation

| Topic                                              | Description                         |
| -------------------------------------------------- | ----------------------------------- |
| **[Documentation Index](docs/README.md)**          | Complete documentation navigation   |
| **[Installation Guide](docs/installation.md)**     | Step-by-step setup instructions     |
| **[Running Tests](docs/running-tests.md)**         | How to execute test suites          |
| **[Test Reports](docs/reports.md)**                | Viewing and generating reports      |
| **[Project Structure](docs/project-structure.md)** | Code organization and configuration |

## Test Suites

- **[Onboarding Tests](tests/00_onboarding/)** - New user account setup flow
- **[Smoke Tests](tests/01_smoke/)** - Critical path validation
- **[Mira AI Agent Tests](tests/02_task01/)** - AI chatbot creation, configuration, and management
- **[Live Chat Tests](tests/03_task02/)** - Visitor-operator communication flows

## Manual Test Cases

For manual testers, step-by-step test case documentation is available:

- **[Visitor Test Cases](tests/03_task02/testCases/visitor-test-cases.md)** - Manual testing from visitor perspective
- **[Operator Test Cases](tests/03_task02/testCases/operator-test-cases.md)** - Manual testing from operator perspective

## Technologies

- **[Playwright](https://playwright.dev/)** - Cross-browser testing framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe test development
- **[Allure](https://docs.qameta.io/allure/)** - Advanced test reporting
- **Page Object Model** - Maintainable test architecture
