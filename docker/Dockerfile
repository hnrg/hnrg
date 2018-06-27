FROM node:9.5.0

MAINTAINER HNRG <hnrg@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn \
    && yarn build:dev

EXPOSE 8000
CMD ["yarn", "start"]
