FROM node:16

WORKDIR /app/fe_admin

COPY package.json yarn.lock ./

RUN yarn

RUN yarn build

COPY . .