FROM node:20.9.0-alpine

RUN apk add --no-cache make gcc g++ python3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["./start.sh"]