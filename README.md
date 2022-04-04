# Playwright Service Worker Demo

A simple application that shows how to setup playwright with a self signed certificate so that service workers can be tested in a Docker container.

For the self signed certificate to work we need to [add it to chrome](https://chromium.googlesource.com/chromium/src.git/+/master/docs/linux/cert_management.md) using [`certutil`](https://helpmanual.io/man1/crlutil/).

## NPM Scripts

- `start`: runs the application.
- `start:sw`: runs the built application. Requires `build` to be run first. This can be used to test the service worker locally.
- `build`: builds the application.
- `playwright-install`: installs the supported browsers.
- `playwright`: runs all of the playwright tests.

## Running the Playwright Tests

1. `docker build --target demo-app . -t demo-app-image` - build the demo app image that will host the built React application via Apache.
1. `docker run -dp 3000:443 --name demo-app-container demo-app-image` - start the demo app web server.
1. `docker build --target playwright-test -t playwright-test-image .` - build the playwright image that will run all of the playwright tests.
1. `docker run --ipc=host --rm --network=host playwright-test-image /bin/sh -c "npx playwright test"` - run the playwright tests against the live demo app.
    > Use the `DEBUG=pw:api npx playwright test` command instead to configure playwright for verbose logging.