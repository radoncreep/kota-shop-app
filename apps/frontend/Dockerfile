
FROM node:18.0.0-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5173

CMD [ "yarn", "dev" ]