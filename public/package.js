class Move {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = 0;
    this.y = 0;
  }
  init(x, y) {
    this.x = x;
    this.y = y;
  }
  update(c_x, c_y) {
    // 得到开始的位置
    const { x, y } = this;
    // 得到移动后的位置 c_x,c_y
    // 获取当前canvas元素位置
    const { offsetLeft, offsetTop } = this.canvas;
    // 得到移动距离
    const mx = c_x - x;
    const my = c_y - y;
    // 当前位置加移动距离 得到 目标位置
    const ml = (offsetLeft + mx);
    const mt = (offsetTop + my);
    // 边界判断
    this.canvas.style.left = ml >= 0 ? 0 : Math.abs(ml) + 900 >= cv_w ? (cv_w - 900) : ml + 'px';
    this.canvas.style.top = mt >= 0 ? 0 : Math.abs(mt) + 450 >= cv_h ? (cv_h - 450) : mt + 'px';

    // 再将移动后的位置保存
    this.x = c_x;
    this.y = c_y;
  }
}

class Socket {
  constructor(callback) {
    this.callback = callback;
    this.socket = io();

    this.init();
  }
  init() {
    const that = this;
    this.socket.on('connect', function () {
      console.log("连接成功", arguments);

    });

    this.socket.on('dot', function (data) {
      that.callback && that.callback(data);
    });

    this.socket.on('disconnect', function () {
      console.log("连接被断开");
    });
  }
  dot(dot) {
    if (Array.isArray(dot) && dot.length === 3) {
      this.socket.emit('dot', dot);
    }
  }
}

class CtxAction {
  constructor(ctx, size = 20) {
    this.colorIndex = 0;
    this.colors = ['#000', '#fff', "#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", '#607d8b'];
    /** @type {CanvasRenderingContext2D} */
    this.ctx = ctx;
    this.size = size;
  }
  draw(x, y, color) {
    const cI = Number.isInteger(parseInt(color)) ? parseInt(color) : this.colorIndex;
    this.ctx.fillStyle = this.colors[cI];

    this.ctx.fillRect(x * this.size, y * this.size, size, size);

    return [x, y, cI];
  }
}