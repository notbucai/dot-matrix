FROM node:13.1.0-alpine

LABEL maintainer="bucai<1450941858@qq.com>"

ADD . /app/

WORKDIR /app

RUN npm install

EXPOSE 2293

CMD ["npm", "start"]
