FROM node:8.8-alpine
WORKDIR /usr/src/sitedevente
COPY package*.json ./
RUN npm install
COPY . .
RUN node ./src/database.insert.js
EXPOSE 3500
CMD [ "node", "index.js" ]
