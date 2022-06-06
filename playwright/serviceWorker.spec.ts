import { test, expect } from "@playwright/test"

/* 
  TODO: replace with test that 
  1. navigates to the page
  1. puts the browser context into offline mode
  1. reloads the page
  1. asserts that application is still showing and not chromium error page
*/

test("can load the dashboard while offline", async ({ page, context }) => {
  await page.goto("/")

  // wait for pre-cache
  await new Promise<void>(resolve => {
    setTimeout(async () => {
      resolve()
    }, 5000)
  })

  await context.setOffline(true)

  // this triggers a redirect to chrome-error://chromewebdata/ in headless mode but not in debug mode or in chrome
  await expect(page.reload()).rejects.toEqual(
    expect.objectContaining({
      message: expect.stringContaining("ERR_INTERNET_DISCONNECTED")
    })
  )

  // log the following navigations and wait for the chrome-error redirect
  await page.waitForNavigation({
    url: url => {
      console.log({ navUrl: url.href })
      return url.href.includes("chrome-error")
    }
  })

  // assert that browser default error page is not shown
  await expect(page.locator("text=ERR_INTERNET_DISCONNECTED")).not.toBeVisible()

  // assert that app is being shown
  await expect(
    page.locator("text=Playwright service worker offline reload demo app")
  ).toBeVisible()
})

