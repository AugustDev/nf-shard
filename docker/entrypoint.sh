#!/bin/sh

# deploy migrations
npx prisma migrate deploy

# run server
node server.js