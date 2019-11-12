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
      console.log("连接被断开", data);
    });
  }
  dot(dot) {
    if (Array.isArray(dot) && dot.length === 3) {
      this.socket.emit('dot', dot);
    }
  }
}