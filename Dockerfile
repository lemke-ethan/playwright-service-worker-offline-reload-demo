
# demo app

FROM node:16-bullseye-slim AS built-demo
COPY / demo/
WORKDIR demo
RUN npm install
RUN npm run build

FROM httpd:latest AS httpd-base
COPY docker/http/localhost.crt /usr/local/apache2/conf/server.crt
COPY docker/http/localhost.key /usr/local/apache2/conf/server.key
COPY docker/http/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY docker/http/httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf

FROM httpd-base AS demo-app
COPY --from=built-demo /demo/build/ /usr/local/apache2/htdocs/

# playwright

# remove lines 24, 29-32 if you would like to run the tests without a trusted certificate

FROM mcr.microsoft.com/playwright:v1.20.0-focal AS playwright-test
COPY docker/http/localhost.crt /workspace/localhost.crt
COPY /playwright.config.ts /workspace/playwright.config.ts
COPY /playwright /workspace/playwright
WORKDIR /workspace
RUN npm install -D @playwright/test
RUN apt-get update && apt-get install -y libnss3-tools
RUN mkdir -p $HOME/.pki/nssdb
RUN certutil -N -d sql:$HOME/.pki/nssdb 
RUN certutil -A -d sql:$HOME/.pki/nssdb -t "C,," -n localhost -i localhost.crt