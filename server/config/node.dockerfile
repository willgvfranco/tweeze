FROM node:15.14.0-alpine3.10
LABEL maintainer="William Franco <williamgvfranco@gmail.com>"
COPY . /var/www
WORKDIR /var/www
RUN apk update && apk add --update nodejs npm && npm install pm2 -g && npm install
# ENTRYPOINT python manage.py runserver 0.0.0.0:8000
# ENTRYPOINT pm2 start
# CMD ["pm2-runtime", "ecosystem.config.js"]
CMD ["npm", "start"]
# CMD ["node", "app.js"]
EXPOSE 7777
