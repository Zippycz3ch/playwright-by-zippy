# Test Reports

## Allure Reports (Recommended)

After running tests, generate and view detailed Allure reports:

```bash
# Generate and serve Allure report
npm run report
```

This will:

1. Generate the Allure report from test results
2. Start a local server at **http://localhost:8080**

### Report Features

- 📊 Test execution overview and statistics
- 🎥 Video recordings of test failures
- 📸 Screenshots on assertion failures
- 📋 Detailed step-by-step test execution
- 🏷️ Test categorization and filtering
- 📈 Historical trends (if running repeatedly)

### Alternative Allure Commands

```bash
# Generate report only (no server)
allure generate allure-results --clean

# Serve existing report
python3 -m http.server 8080 -d allure-report
```

## Playwright HTML Report

If you prefer Playwright's built-in HTML reporter:

```bash
npx playwright show-report
```

### HTML Report Features

- Clean, interactive interface
- Embedded traces and videos
- Test filtering and search
- No external dependencies

## Report Files Location

- `allure-results/` - Raw test result data (XML format)
- `allure-report/` - Generated HTML report files
- `playwright-report/` - Playwright HTML report
- `test-results/` - Screenshots, videos, traces

## Continuous Integration

For CI/CD environments:

```bash
# Generate report without opening browser
allure generate allure-results --clean --output ./allure-report

# Publish to static hosting
# Copy ./allure-report/* to your web server
```

## Troubleshooting Reports

If you encounter issues with report generation, see [Troubleshooting](troubleshooting.md#allure-report-issues).
