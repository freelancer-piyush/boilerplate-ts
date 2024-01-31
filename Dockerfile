FROM node:latest
RUN apt-get update
RUN apt-get upgrade -y
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
COPY build build
COPY src src
COPY .env .env
RUN npm install tsc -g
RUN npm install

ENTRYPOINT ["node","build/index.js"]


