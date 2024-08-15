FROM node:20.16.0-bookworm-slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD npm start