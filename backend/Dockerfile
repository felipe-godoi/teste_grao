FROM node:20.9.0-alpine

RUN apk add --no-cache make gcc g++ python3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm rebuild bcrypt --build-from-source;npm run migration:run; npm run seed; npm run start:dev" ]