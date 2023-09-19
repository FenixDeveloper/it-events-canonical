# base image
FROM node:18.16.0-alpine as build

# set working directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD cp -r build result_build