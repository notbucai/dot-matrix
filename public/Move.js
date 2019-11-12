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