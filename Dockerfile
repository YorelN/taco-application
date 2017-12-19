FROM "nginx:alpine"

ENV APP_HOME /usr/share/nginx/html

WORKDIR $APP_HOME

COPY ./build .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g",  "daemon off;"]