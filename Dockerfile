# syntax=docker/dockerfile:1
FROM node:18-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci
EXPOSE ${PORT}
ENV DB_DIALECT ${DB_DIALECT}
ENV DB_HOST postgres
ENV DB_PORT ${DB_PORT}
ENV DB_USERNAME ${DB_USERNAME}
ENV DB_PASSWORD ${DB_PASSWORD}
ENV DB_NAME ${DB_NAME}
ENV PORT ${PORT}
ENV JWT_SECRET ${JWT_SECRET}
ENV SMTP_HOST ${SMTP_HOST}
ENV SMTP_PORT ${SMTP_PORT}
ENV SMTP_USER ${SMTP_USER}
ENV SMTP_PASS ${SMTP_PASS}
ENV CLIENT_HOST ${CLIENT_HOST}
ENV STATIC_FOLDER ${STATIC_FOLDER}
CMD ["node", "dist/main.js"]
