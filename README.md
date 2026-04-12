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
| **[Test Suites](docs/test-suites.md)**             | Available test scenarios            |
| **[Troubleshooting](docs/troubleshooting.md)**     | Common issues and solutions         |
| **[Contributing](docs/contributing.md)**           | Development workflow and guidelines |

## Test Suites

- **[Mira AI Agent Tests](tests/02_task01/)** - AI chatbot creation, configuration, and management
- **[Live Chat Tests](tests/03_task02/)** - Visitor-operator communication flows
- **[Smoke Tests](tests/01_smoke/)** - Critical path validation

## Technologies

- **[Playwright](https://playwright.dev/)** - Cross-browser testing framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe test development
- **[Allure](https://docs.qameta.io/allure/)** - Advanced test reporting
- **Page Object Model** - Maintainable test architecture

## Features

- Cross-browser testing (Chrome, Firefox, Safari)
- Video recording and screenshots on failure
- Detailed step-by-step reporting with Allure
- Page Object Model architecture
- Environment-based configuration
- CI/CD ready

## Quick Commands

```bash
# Run all tests
npm run test

# Run with browser visible
npm run test:headed

# Run specific test suite
npm run test:task01

# Generate reports
npm run report
```

## Requirements

- Node.js 16+
- Java 17 (for Allure reports)
- Modern web browser

## License

ISC
