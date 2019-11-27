FROM bitnami/node:12-prod

COPY . /app

WORKDIR /app

ENV SERVER_ADDRESS=0.0.0.0

EXPOSE 4001
USER 1001

CMD node server.js
