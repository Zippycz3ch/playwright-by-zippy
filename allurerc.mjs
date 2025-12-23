import { defineConfig } from "allure";

export default defineConfig({
  name: "API Tests Playwright Report",
  output: "./allure-report",
  resultsDir: "./allure-results",
  plugins: {
    awesome: {
      options: {
        singleFile: true,
        reportLanguage: "en",
        open: true
      },
    },
  },
});
