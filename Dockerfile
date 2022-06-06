
# demo app

FROM node:16-bullseye-slim AS playwright-service-worker-offline-reload-demo-base
COPY / demo/
WORKDIR demo
RUN npm install
RUN npm run build

FROM httpd:latest AS httpd-base
COPY docker/http/localhost.crt /usr/local/apache2/conf/server.crt
COPY docker/http/localhost.key /usr/local/apache2/conf/server.key
COPY docker/http/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY docker/http/httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf

FROM httpd-base AS playwright-service-worker-offline-reload-demo
COPY --from=playwright-service-worker-offline-reload-demo-base /demo/build/ /usr/local/apache2/htdocs/