FROM node:latest

COPY . /app

WORKDIR /app

RUN ["yarn"]

CMD ["yarn", "start"]
