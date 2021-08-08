FROM python:3.9.4-alpine3.12
LABEL maintainer "William Franco"
COPY /worker/ /var/www
WORKDIR /var/www
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev && apk add libxml2-dev libxslt-dev zlib-dev gcc musl-dev && pip install -r requirements.txt 
ENTRYPOINT python worker.py
EXPOSE 7777