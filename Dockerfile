FROM node:12.4-alpine

WORKDIR /app

COPY . /app

RUN npm install

ENV NODE_ENV production

EXPOSE 8882

CMD ["node", "./dist/server.js"]