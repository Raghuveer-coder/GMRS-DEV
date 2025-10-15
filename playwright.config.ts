import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // The root directory that Playwright will search for tests.
  testDir: './',
  // Glob pattern to match your test files. This is more flexible.
  testMatch: '**/*.spec.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. (Removed to use full URLs in tests) */
    // baseURL: 'https://gasibccdev.gasmalaysia.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    // Ignore SSL certificate errors, as was done in the original login helper.
    ignoreHTTPSErrors: true,
    // Set a consistent viewport for all tests.
    viewport: { width: 1920, height: 1080 },
    /*
     * Headless vs Headed Mode
     * -------------------------
     * Run tests in headless mode in CI environments.
     * On local machines, this will default to headed mode for easier debugging.
     */
    headless: false, // Always run in headed (visible browser) mode
  },

  /* Configure projects for major browsers. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    { name: 'webkit', use: { ...devices['Desktop Safari'] } },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
