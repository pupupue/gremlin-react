FROM alpine:latest
RUN apk add --no-cache nodejs npm
RUN apk add --no-cache bash
# 
WORKDIR /app
COPY . /app

RUN npm install
EXPOSE 5002

CMD [ "node", "server" ]