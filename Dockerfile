FROM node:alpine3.10
WORKDIR /vente
COPY package.json ./
RUN npm install
COPY . .
RUN npm run insert
EXPOSE 3500
CMD [ "npm", "start" ]
