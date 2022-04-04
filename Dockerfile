FROM node:16.14.2

RUN set -x \
    && chmod 775 /usr/local/bin/* \
    && chmod +x /usr/local/bin/*.sh

WORKDIR /app

COPY . /app

RUN set -x \
    && yarn \
    && yarn test \
    && yarn build

FROM node:16.14.2

WORKDIR /app

COPY --from=0 /app/dist /app/dist
COPY --from=0 /app/package.json /app
COPY --from=0 /app/.env /app
COPY --from=0 /app/ormconfig.js /app
COPY --from=0 /app/yarn.lock /app

RUN set -x \
    && yarn install --prod \
    && yarn cache clean

EXPOSE 8080

CMD yarn start

