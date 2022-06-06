# Playwright Service Worker Offline Reload Demo

An example application to demo reloading the browser while it is simulating offline mode in a headless browser and how it behaves differently in a non-headless browser. Specifically, when running the tests in headless chromium.

## NPM Scripts

- `start`: runs the application.
- `start:sw`: runs the built application. Requires `build` to be run first. This can be used to test the service worker locally.
- `build`: builds the application.
- `playwright-install`: installs the supported browsers.
- `playwright`: starts the demo app in docker and runs all of the playwright tests from your host machine.
- `playwright:debug`: starts the demo app in docker and runs all of the playwright tests in debug mode from your host machine.

## Run the Demo

1. `npm install`
2. `npm run playwright-install`
3. install the generated certificate located in `docker/http/localhost.crt`
4. `docker build --target playwright-service-worker-offline-reload-demo . -t playwright-service-worker-offline-reload-demo-image` - build the demo app image that will host the built React application via Apache.
5. `docker run -dp 3000:443 --name playwright-service-worker-offline-reload-demo-container playwright-service-worker-offline-reload-demo-image` - start the demo app web server.
6. `npm run playwright`
   > All of the tests should fail. Now, run it in debug mode to confirm that all of the tests pass.
7. `npm run playwright:debug`
