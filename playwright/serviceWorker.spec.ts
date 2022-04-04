import { test, Page, expect } from "@playwright/test"

const serviceWorkerRegex = /serviceworker/mig

test.describe("service worker", () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    // listen for service worker errors
    page.on("console", (consoleMessage) => {
      if (consoleMessage.type() === "error") {
        expect(consoleMessage.text()).not.toMatch(serviceWorkerRegex)
      }
    })
  })
  test.beforeEach(async () => {
    await page.goto("/")
  })

  test("registers the service worker", async ({ context }) => {
    const numberOfServiceWorkerRegistrations = await page.evaluate(() => {
      if (navigator.serviceWorker) {
        return navigator.serviceWorker.ready
          .then(() => {
            return navigator.serviceWorker
              .getRegistrations()
              .then(registrations => registrations.length)
          })
      }
      return Promise.reject("service workers are not supported")
    })

    expect(numberOfServiceWorkerRegistrations).toBe(1)
  })
})
