FROM node:0.10.33-onbuild

RUN npm install -g grunt-cli

EXPOSE 3003

CMD ["grunt", "serve"]
