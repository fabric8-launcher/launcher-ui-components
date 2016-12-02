FROM node:4-onbuild
MAINTAINER "Charles Moulliard <cmoulliard@redhat.com>"

ENV LANG=en_US.utf8

#ENV FORGE_URL http://api.example.org/api/
RUN npm install http-server -g
RUN npm run build:prod

EXPOSE 8080

WORKDIR ./dist

CMD http-server . -d -p 8080 -a 0.0.0.0