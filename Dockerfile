FROM "node:alpine"

ENV APP_HOME /usr/taco/application

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

COPY ./package.json ./package.json

RUN npm install

COPY . . 

RUN npm run build

RUN rm -rf public src  

EXPOSE 80

ENTRYPOINT [ "node", "server.js"]