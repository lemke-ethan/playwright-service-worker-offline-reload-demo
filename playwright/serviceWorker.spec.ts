import { test, Page, expect } from "@playwright/test"

/* 
  TODO: replace with test that 
  1. navigates to the page
  1. puts the browser context into offline mode
  1. reloads the page
  1. asserts that application is still showing and not chromium error page
*/

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
