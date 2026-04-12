# Test Reports

## Allure Reports (Recommended)

After running tests, generate and view detailed Allure reports:
The test are mainly annotated with Allure steps, but the PW HTML reporter should mostly work

```bash
# Generate and serve Allure report
npm run report
```

This will:

1. Generate the Allure report from test results
2. Start a local server at **http://localhost:8080**

## Playwright HTML Report

If you prefer Playwright's built-in HTML reporter:

```bash
npx playwright show-report
```

## Report Files Location

- `allure-results/` - Raw test result data (XML format)
- `allure-report/` - Generated HTML report files
- `playwright-report/` - Playwright HTML report
- `test-results/` - Screenshots, videos, traces
