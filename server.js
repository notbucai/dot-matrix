const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const koaBody = require('koa-body');
const path = require('path');
const Content = require('./model/Content');
const consola = require('consola');
const Socket = require('socket.io');
const http = require('http');
const render = require('koa-ejs');

const app = new Koa();
const router = new Router();
const PROP = 2293;
const STATIC_PATH = path.join(__dirname, 'public');

consola.info(STATIC_PATH);

app.use(koaBody());

render(app, {
  root: STATIC_PATH,
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(router.routes()).use(router.allowedMethods());
app.use(static(STATIC_PATH));

router.get('/', async (ctx, next) => {
  const points = await Content.content();
  await ctx.render('content', {
    points: JSON.stringify(points)
  });
});
router.get('/api', async (ctx, next) => {
  console.time('api');
  ctx.body = await Content.content();
  console.timeEnd('api');
});

const server = http.createServer(app.callback());

const io = Socket(server);

io.on('connection', function (socket) {
  consola.success('收到了一个链接=>', socket.id);
  socket.on('dot', async function (dot) {
    await Content.content(dot);
    io.emit('dot', dot);
  });
  socket.on('disconnect', function () {
    consola.error('断开了一个链接=>', socket.id);
  });
});

server.listen(PROP, () => {
  consola.success(`http://0.0.0.0:${PROP}/`);
});
