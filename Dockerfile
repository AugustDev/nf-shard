FROM node:lts-alpine3.17 AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --immutable --immutable-cache --check-cache --frozen-lockfile
COPY . .
RUN yarn generate && yarn build

FROM node:lts-alpine3.17
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/yarn.lock .
COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/build/standalone ./
COPY --from=build /app/build/static ./build/static
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "server.js"]