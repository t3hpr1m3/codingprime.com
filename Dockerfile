FROM node:6-alpine

RUN apk update && apk add bash g++ make python
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 3003

CMD ["npm", "start"]
