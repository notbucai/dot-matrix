FROM node:12.18.2

LABEL maintainer="bucai<1450941858@qq.com>"

ADD . /app/

WORKDIR /app

RUN npm install --registry https://registry.npm.taobao.org

EXPOSE 2293

CMD ["npm", "start"]
