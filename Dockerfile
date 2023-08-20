# syntax=docker/dockerfile:1
FROM node:18-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm ci
RUN npm run build
EXPOSE ${PORT}
CMD ["node", "dist/main.js"]
