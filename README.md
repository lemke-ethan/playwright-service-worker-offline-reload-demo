# Playwright Service Worker Offline Reload Demo

An example application to demo reloading the browser while it is simulating offline mode in a headless browser and how it behaves differently in a non-headless browser. Specifically, when running the tests in headless chromiou

## NPM Scripts

- `start`: runs the application.
- `start:sw`: runs the built application. Requires `build` to be run first. This can be used to test the service worker locally.
- `build`: builds the application.
- `playwright-install`: installs the supported browsers.
- `playwright`: starts the demo app in docker and runs all of the playwright tests.
