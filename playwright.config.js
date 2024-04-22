// @ts-check
const { defineConfig, devices } = require('@playwright/test');

export default defineConfig({
  name: 'Testing regex checker page',
  testDir: './tests',
  timeout: 120000,
  fullyParallel: true,
  reporter: 'html',
  retries: 2,
  outputDir: 'test-results',
  // globalSetup: require.resolve('./global-setup.js'),
  // globalTeardown: require.resolve('./global-teardown.js'),

  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  expect: {
    timeout: 10000,
  },

  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
      viewport: {width: 1920, height: 1040},  // needs to be checked for the actual monitor
      }
    },

    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], 
      channel: 'msedge',
      viewport: {width: 1920, height: 1040},  // needs to be checked for the actual monitor
      }
    },

    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], 
      viewport: {width: 1920, height: 1040}, // needs to be checked for the actual monitor
      }
    },
  ],


});

