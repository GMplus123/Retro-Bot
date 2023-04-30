FROM node:19

WORKDIR /

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "run", "bot"]