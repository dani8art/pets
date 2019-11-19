FROM bitnami/node:12-prod

COPY . /app

WORKDIR /app

EXPOSE 4001

CMD node server.js