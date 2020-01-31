FROM node:alpine3.10
WORKDIR /usr/src/sitedevente
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3500
CMD [ "node", "index.js" ]
