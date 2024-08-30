###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2023-12-11                                              ##
## version         : 3.0                                                     ##
##                                                                           ##
###############################################################################
###############################################################################

ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /opt

COPY package.json yarn.lock yarn.lock tsconfig.json tsconfig.compile.json .barrelsby.json ./

RUN yarn set version berry
RUN yarn install --immutable

COPY ./src ./src

RUN yarn build

FROM node:${NODE_VERSION}-alpine as runtime
ENV WORKDIR /opt
WORKDIR $WORKDIR

RUN apk update && apk add build-base git curl
RUN npm install -g pm2

COPY --from=build /opt .

RUN yarn set version berry
RUN yarn install --immutable
## RUN yarn workspaces focus --all --production

COPY . .

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD ["pm2-runtime", "start", "processes.config.js", "--env", "production"]
