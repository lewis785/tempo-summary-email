FROM node:12.14.1-alpine

RUN apk update && \
    apk add bash && \
    mkdir -p /app
COPY . ./app
WORKDIR /app
RUN npm run build

CMD tail -f /dev/null
