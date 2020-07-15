# NodeJS base image.
FROM node:12.18.2-alpine as build_stage

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# New stage.
FROM nginx:1.19-alpine

COPY --from=build_stage /app/build /usr/share/nginx/html/
