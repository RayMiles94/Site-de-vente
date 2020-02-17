FROM node:carbon-stretch-slim
WORKDIR /usr/src/vente
COPY package*.json ./
RUN npm install  -no-cache
RUN npm audit fix
COPY . .
RUN npm run insert
EXPOSE 4500
CMD [ "npm", "start" ]
