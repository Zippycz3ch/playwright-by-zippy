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

## Saved E2E Run Results

A verified passing run of the full Mira AI E2E test (`06_mira-ai-E2E.spec.ts`) is saved in [`tests/02_task01/E2Eresults/`](../tests/02_task01/E2Eresults/).
It contains a video recording (`.webm`), a Playwright trace (`.zip`), and a raw Allure result (`.json`).

To replay the trace:

```bash
npx playwright show-trace tests/02_task01/E2Eresults/<trace-file>.zip
```
