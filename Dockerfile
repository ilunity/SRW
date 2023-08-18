# syntax=docker/dockerfile:1
FROM node:18-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci
EXPOSE ${PORT}
CMD ["node", "dist/main.js"]
