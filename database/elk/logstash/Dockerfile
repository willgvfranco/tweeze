ARG ELK_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}
RUN /opt/logstash/bin/logstash-plugin install logstash-integration-jdbc
#RUN /opt/logstash/bin/logstash-plugin install logstash-input-jdbc
ADD https://jdbc.postgresql.org/download/postgresql-42.2.22.jar /usr/share/logstash/logstash-core/lib/jars/postgresql-42.2.22.jar
#ADD https://jdbc.postgresql.org/download/postgresql-42.2.22.jar logstash-core/lib/jars/
#ADD https://jdbc.postgresql.org/download/postgresql-42.2.22.jar /usr/share/logstash/drivers/
USER root
RUN chown -R logstash:root /usr/share/logstash/logstash-core/lib/jars/postgresql-42.2.22.jar


# Add your logstash plugins setup here
# Example: RUN logstash-plugin install logstash-filter-json
