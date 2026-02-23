import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 2,
  workers: isCI ? 1 : 4,
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/playwright-report", open: "always" }],
    ["allure-playwright", { outputFolder: "reports/allure-results" }],
    ["json", { outputFile: "reports/json-report/test-results.json" }],
  ],
  use: {
    // proxy: enabled locally, disabled on CI
    ...(isCI ? {} : { proxy: { server: "http://10.38.107.203:3120" } }),
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    }
  ],
});
