FROM registry.centos.org/kbsingh/openshift-nginx:latest
MAINTAINER "Konrad Kleine <kkleine@redhat.com>"

ENV LANG=en_US.utf8

USER root
ADD nginx.conf /etc/nginx/nginx.conf
USER 997

RUN rm /usr/share/nginx/html/*

COPY dist /usr/share/nginx/html