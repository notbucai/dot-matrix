# dot-matrix
通过 Koa + Socket.io + Canvas 实现在线点阵画板  
> [https://lattice.notbucai.com/](https://lattice.notbucai.com/)

## 展示

![show.png](./show.png)  

## 使用

> 环境依赖 `mongodb` 、 `nodejs`

1. `yarn` or `npm install`   
2. `yarn dev` or `npm run dev`   

## 目录结构

```
|- /figure         一些图案的点阵坐标
|- /model          数据库模型
  |- Content.js   点阵的数据模型
|- /mongodb        数据库工具类
  |- db.js        mongodb连接库
|- /public         公共静态资源目录
  |- index.html   静态文件
|- server.js      服务器
|- Dockerfile     Docker 镜像文件
|- docker-compose.yml
|- lattice.conf   nginx 配置

```

