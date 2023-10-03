FROM node:latest

WORKDIR /client-app

COPY ./client-app/package.json .

WORKDIR /lms

COPY ./lms/package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]









