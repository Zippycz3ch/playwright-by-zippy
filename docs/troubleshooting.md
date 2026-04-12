# Troubleshooting

## Allure Report Issues

### Java/Snap Conflicts

If you encounter Java/snap conflicts when trying to use `allure serve`:

```bash
# ❌ This might fail due to Java/snap conflicts
allure serve

# ✅ Use this reliable alternative
npm run report
```

**Common Error Messages:**

- `java: symbol lookup error: /snap/core20/current/lib/x86_64-linux-gnu/libpthread.so.0`
- `undefined symbol: __libc_pthread_init, version GLIBC_PRIVATE`

**Solution:** Our `npm run report` script uses Python's HTTP server instead of Java, avoiding all compatibility issues.

### Java Installation Issues

```bash
# Check Java version
java -version

# Reinstall Java 17 if needed
sudo apt remove openjdk-21-jdk openjdk-21-jre -y
sudo apt install openjdk-17-jdk -y

# Set correct Java alternative
sudo update-alternatives --config java
```

## Browser Installation Issues

If tests fail to find browsers:

```bash
# Reinstall Playwright browsers
npx playwright install --force

# Install system dependencies
sudo npx playwright install-deps

# Check browser installation
npx playwright install --dry-run
```

### Ubuntu 24 Compatibility

On Ubuntu 24 and above, you may see warnings about unsupported OS versions. These can usually be ignored:

```bash
# Install additional dependencies if needed
sudo apt update
sudo apt install libnss3-dev libatk-bridge2.0-dev libxcomposite-dev libxdamage-dev libxrandr-dev libgbm-dev
```

## Environment Setup Issues

### Missing .env File

Make sure your `.env` file contains valid credentials:

```bash
# Copy example file
cp .env.example .env

# Edit with your credentials
SMARTSUPP_USERNAME=your-email@example.com
SMARTSUPP_PASSWORD=your-password
SMARTSUPP_DOMAIN=smartsupp.com
```

### Environment Variables Not Loading

```bash
# Check if dotenv is working
node -e "require('dotenv').config(); console.log(process.env.SMARTSUPP_USERNAME)"

# Verify .env file location (should be in project root)
ls -la .env
```

## Test Execution Issues

### Tests Timing Out

```bash
# Increase timeout in playwright.config.ts
use: {
  timeout: 60000, // 60 seconds
}

# Or set per test
test.setTimeout(120000); // 2 minutes
```

### Network Issues

```bash
# Check connectivity to Smartsupp
ping smartsupp.com

# Run tests with retry on failure
npx playwright test --retries=2
```

### Page Object Locator Issues

```bash
# Debug locator issues
npx playwright test --debug

# Use Playwright inspector
npx playwright codegen smartsupp.com
```

## Performance Issues

### Slow Test Execution

```bash
# Run tests in parallel (adjust worker count)
npx playwright test --workers=2

# Disable video recording for faster execution
npx playwright test --project="Smartsupp UI" --reporter=line
```

### Memory Issues

```bash
# Clear old test artifacts
rm -rf test-results/
rm -rf allure-results/
rm -rf playwright-report/

# Monitor system resources
htop
```

## Getting Help

If you continue to experience issues:

1. Check [Playwright Documentation](https://playwright.dev/docs/intro)
2. Review [Allure Documentation](https://docs.qameta.io/allure/)
3. Search existing [GitHub Issues](https://github.com/microsoft/playwright/issues)
4. Create a new issue with detailed error logs and system information
