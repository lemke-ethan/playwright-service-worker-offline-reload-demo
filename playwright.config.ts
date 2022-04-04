import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  testDir: "./playwright",
  timeout: 30 * 1000,
  expect: {
    timeout: 20000
  },
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    contextOptions: {
      // TODO: remove after we fix the cert
      ignoreHTTPSErrors: true,
    },
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 0,
    baseURL: "https://localhost:3000",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium"
      }
    }
  ]
}

export default config
