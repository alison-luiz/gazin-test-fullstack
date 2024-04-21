FROM node:20

WORKDIR /app

COPY ./gazin-api/tsconfig*.json ./
COPY ./gazin-api/package.json ./
COPY ./gazin-api/.env.example ./.env

RUN yarn install

COPY ./gazin-api .

CMD ["yarn", "start:dev"]