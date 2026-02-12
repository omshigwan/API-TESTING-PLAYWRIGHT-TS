import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: 1,
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/playwright-report", open: "always" }],
    ["allure-playwright", { outputFolder: "reports/allure-results" }],
    ["json", { outputFile: "reports/json-report/test-results.json" }],
  ],
  use: {
    proxy: {
      server: "http://10.38.107.203:3120",
    },
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
