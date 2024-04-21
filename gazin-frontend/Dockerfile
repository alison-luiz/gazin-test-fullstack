FROM node:20

WORKDIR /app

RUN npm install -g http-server

COPY ./gazin-frontend/package.json ./

RUN yarn install

COPY ./gazin-frontend .

CMD ["yarn", "start", "--host", "0.0.0.0"]