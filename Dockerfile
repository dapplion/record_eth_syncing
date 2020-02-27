FROM node:10.15.3-alpine
WORKDIR /usr/src/app

COPY src /usr/src/app
RUN npm i

CMD [ "node", "index" ]

