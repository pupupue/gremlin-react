FROM openjdk:8-alpine

ARG GREMLIN_VERSION=3.3.11

RUN apk add --update bash && rm -rf /var/cache/apk/* && \
    wget -O /tmp/gremlin-server.zip https://archive.apache.org/dist/tinkerpop/${GREMLIN_VERSION}/apache-tinkerpop-gremlin-server-${GREMLIN_VERSION}-bin.zip && \
    unzip /tmp/gremlin-server.zip -d / && \
    mv /apache-tinkerpop-gremlin-server-${GREMLIN_VERSION}/ /gremlin-server/ && \
    chmod +x /gremlin-server/bin/gremlin-server.sh && \
    rm /tmp/gremlin-server.zip

WORKDIR /gremlin-server/

RUN /bin/bash -c "/gremlin-server/bin/gremlin-server.sh install \
org.apache.tinkerpop gremlin-python ${GREMLIN_VERSION}"

COPY server.yaml ./conf/server.yaml
COPY empty.groovy ./scripts/empty.groovy
COPY graph.graphml ./conf/graph.graphml

EXPOSE 8182
CMD ["/bin/bash",\
    "/gremlin-server/bin/gremlin-server.sh",\
    "conf/server.yaml"]