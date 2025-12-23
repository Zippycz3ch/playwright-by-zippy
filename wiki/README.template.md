# PlayWright in TypeScript with Allure Reports

This repository demonstrates how to set up Playwright with TypeScript and integrate Allure reports for better test reporting.

It also contains docker-compose files for easy setup of local QuickPizza from Grafana for learning purposes.

![Node version](https://img.shields.io/badge/node-%3E%3D18-blue?logo=node.js)
![License](https://img.shields.io/badge/license-ISC-brightgreen)
[![Dependabot Updates ](https://github.com/Zippycz3ch/PlayWright-By-Zippy/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/Zippycz3ch/PlayWright-By-Zippy/actions/workflows/dependabot/dependabot-updates)

[![Playwright](https://img.shields.io/npm/v/@playwright/test?color=blueviolet&label=playwright)](https://www.npmjs.com/package/@playwright/test)
[![Allure](https://img.shields.io/npm/v/allure-playwright?color=orange&label=allure-playwright)](https://www.npmjs.com/package/allure-playwright)

---

## 📦 Packages Used

{{PACKAGE_LIST}}

---

## 1. Install Initial Requirements

- Install **Java 8**, **Git**, and **VS Code** using Ninite:  
  [Ninite Installer](https://ninite.com/adoptjavax8-git-vscode/)

- Install **Node.js**:  
  [Download Node.js](https://nodejs.org/en/download)

## 2. Install Project Packages

Open VS Code and clone the repository:

```bash
git clone https://github.com/Zippycz3ch/PlayWright-By-Zippy.git
```

Open the cloned folder in VS Code.

Then run:

```bash
npm install
```

## 3. Install Playwright Chromium

```bash
npx playwright install chromium
```

Optionally install all browsers:

```bash
npx playwright install chromium firefox webkit
```

## 4. Configure VS Code

Install the **Playwright Test for VS Code** extension:  
<img src="wiki/extentions.png" alt="Playwright Extension" width="400"/>

If you don’t see tests in the **Testing** tab, click **Refresh**:  
<img src="wiki/image.png" alt="Refresh Tests" width="400"/>

## 5. Run Tests

```bash
npm test
```

Open HTML report:

```bash
npx playwright show-report
```

Open Allure report:

```bash
npx allure serve
```

---

## 🚀 Start Docker with local QuickPizza

```bash
cd docker
docker-compose up -d
```

Then open: [http://localhost:3333](http://localhost:3333)
