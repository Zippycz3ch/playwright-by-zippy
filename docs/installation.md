# Installation Guide

## Prerequisites

- [Node.js & npm](https://nodejs.org/) (v16 or higher)
- [Java 17](https://openjdk.org/) (for Allure reports)
- [VS Code](https://code.visualstudio.com/) (recommended)
- [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) (recommended)

## Installation Steps

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

> **Note:** There may be some errors on Ubuntu 24 and above, as they are not officially supported, but the tests should be able to run.

```bash
sudo npx playwright install-deps
```

### 3. Install Java 17 for Allure Reports

```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
```

### 4. Install Allure Command Line

```bash
sudo npm install -g allure-commandline
```

### 5. Configure Environment Variables

Create a `.env` file in the root directory with your credentials:

```bash
cp .env.example .env
# Edit .env with your actual credentials
```

## Next Steps

After installation, see:

- [Running Tests](running-tests.md) - How to execute test suites
- [Configuration](project-structure.md) - Environment setup and project structure
- [Troubleshooting](troubleshooting.md) - Common installation issues
