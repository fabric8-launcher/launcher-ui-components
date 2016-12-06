# FROM registry.centos.org/kbsingh/openshift-nginx:latest
# MAINTAINER "Konrad Kleine <kkleine@redhat.com>"
#
# ENV LANG=en_US.utf8
#
# USER root
# ADD nginx.conf /etc/nginx/nginx.conf
# USER 997
#
# RUN rm /usr/share/nginx/html/*
#
# COPY dist /usr/share/nginx/html

FROM node:4-onbuild
MAINTAINER "Charles Moulliard <cmoulliard@redhat.com>"

ENV LANG=en_US.utf8
ENV FORGE_URL http://api.example.org/api/

RUN npm install http-server -g

EXPOSE 8080

WORKDIR ./dist

CMD http-server . -d -p 8080 -a 0.0.0.0