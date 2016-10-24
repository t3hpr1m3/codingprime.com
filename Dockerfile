FROM node:6-onbuild

RUN npm install -g nodemon

EXPOSE 3003

CMD ["npm", "start"]
