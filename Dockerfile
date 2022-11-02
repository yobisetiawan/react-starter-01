# build environment
FROM node:18.1.0-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
#ENV REACT_APP_NAME="App Project"
EXPOSE 3000
CMD [ "npm", "start" ]
#ENV REACT_APP_NAME="App Project React"
#RUN npm run build

