FROM node:23.6.0-alpine
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "start:dev"]