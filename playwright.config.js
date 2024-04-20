// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  name: 'Testing regex checker page',
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  reporter: 'html',
  retries: 1,
  outputDir: 'test-results',
  // globalSetup: require.resolve('./global-setup.ts'),
  // globalTeardown: require.resolve('./global-teardown.ts'),

  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  expect: {
    timeout: 10000,
  },

  projects: [
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],


});

