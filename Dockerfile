FROM node:alpine3.10
WORKDIR /usr/src/sitedevente
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run insert
EXPOSE 3500
CMD [ "npm", "start" ]
