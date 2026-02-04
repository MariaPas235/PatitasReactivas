FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./

RUN npm install --omit=dev

COPY server.js ./index.js
COPY db.json ./db.json

EXPOSE 3000

CMD ["node", "index.js"]