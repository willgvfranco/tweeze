FROM redis:6.2.1-alpine
ENV CONTAINER_NAME=Tweeze_cache
COPY /docker/redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
LABEL maintainer="William Franco <williamgvfranco@gmail.com>"
EXPOSE 6379
