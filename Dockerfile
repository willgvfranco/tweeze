FROM postgres:13.2-alpine
ENV POSTGRES_USER=tweeze_AC6244FB933CF3F
ENV POSTGRES_PASSWORD=%7Qzjba#YP6vDBWz8P
ENV POSTGRES_DB=tweeze_zL6xALEp
LABEL maintainer="William Franco <williamgvfranco@gmail.com>"
EXPOSE 5432


# no root do diretorio Tweeze
# docker build -f .\Dockerfile -t neustren/pgsql_tweeze:v1 .
# docker run --name pgsql_tweeze -d -p 5432:5432 neustren/pgsql_tweeze:v1