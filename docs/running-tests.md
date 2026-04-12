# Running Tests

## Prerequisites Check

Before running tests from specific test suites, make sure to read the README.md file in each test folder for specific prerequisites and setup requirements:

- **Onboarding Tests**: Check [tests/00_onboarding/README.md](../tests/00_onboarding/README.md)
- **Smoke Tests**: Check [tests/01_smoke/README.md](../tests/01_smoke/README.md)
- **Task 01 Tests**: Check [tests/02_task01/README.md](../tests/02_task01/README.md)
- **Task 02 Tests**: Check [tests/03_task02/README.md](../tests/03_task02/README.md)

Each test suite have unique setup requirements, environment configurations, or test data prerequisites that must be met before execution.

## Using VS Code Extension (Recommended)

<a href="https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/13063165/330097103-400a3f11-a1e8-4fe7-8ae6-b0460142de35.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251227%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251227T153158Z&X-Amz-Expires=300&X-Amz-Signature=b4ffdd078546daad51569f33ac3dd502316a99710eb152de1b9872d0ca701078&X-Amz-SignedHeaders=host" width="300" alt="Playwright VS Code Extension">
</a>

## Test Execution

```bash
# Run by project
npx playwright test --project="Smartsupp UI"

# Run by tag
npx playwright test --grep "@smoke|@critical"

# Run specific folder
npx playwright test tests/02_task01/ --headed
```

### Test Configuration

```bash
# Run with custom config
npx playwright test --config=playwright.config.ts

# Run with different reporter
npx playwright test --reporter=html

# Run in parallel
npx playwright test --workers=2
```

## Next Steps

- [Test Reports](reports.md) - View detailed test results and reports
- [Test Suites](test-suites.md) - Learn about available test scenarios
- [Troubleshooting](troubleshooting.md) - Fix common execution issues
