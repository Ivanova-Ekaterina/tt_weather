FROM node:11-alpine as build-stage
WORKDIR /app
COPY package.* yarn.* ./
RUN npm i
RUN yarn install
COPY . ./
RUN npm run build

from nginx:1.15-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
