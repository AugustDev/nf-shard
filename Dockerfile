FROM node:lts AS build

WORKDIR /build

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache

FROM node:lts

COPY --from=build /build /app
WORKDIR /app

COPY ./ ./

EXPOSE 3000

RUN yarn generate
RUN yarn build

CMD ["yarn", "start"]