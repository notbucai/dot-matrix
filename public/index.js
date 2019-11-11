const main = document.getElementById('main');

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cv_w = canvas.width;
const cv_h = canvas.height;

const map = [];
const size = 20;

const moveObj = {
  x: 0,
  y: 0,
  /** @type {HTMLCanvasElement} */
  canvas: canvas,
  init(x, y) {
    this.x = x;
    this.y = y;
  },
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

function updateEvent(event) {

  moveObj.update(event.offsetX, event.offsetY);
}

function mouseupEvent() {
  main.removeEventListener('mousemove', updateEvent);
  document.removeEventListener('mouseup', mouseupEvent);
}

function mousedownEvent(event) {

  if (event.button === 0) {
    moveObj.init(event.offsetX, event.offsetY);
    main.addEventListener('mousemove', updateEvent);

  }
  document.addEventListener('mouseup', mouseupEvent);
}
function dblclickEvent(event) {
  clearTimeout(canvas.click_timer);

  if (!dblclickEvent.dbclickStatus) {

    canvas.style.width = cv_w + 'px';
    canvas.style.height = cv_h + 'px';
    const { clientWidth, clientHeight } = main;
    // 双击放大指定区域
    canvas.style.left = -(event.offsetX * cv_w / clientWidth - event.offsetX) + 'px';
    canvas.style.top = -(event.offsetY * cv_h / clientHeight - event.offsetY) + 'px';

    main.addEventListener('mousedown', mousedownEvent);
  } else {
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    main.removeEventListener('mousedown', mousedownEvent);
  }
  dblclickEvent.dbclickStatus = !dblclickEvent.dbclickStatus;
}

function clickEvent(event) {
  clearTimeout(canvas.click_timer);
  const { clientWidth, clientHeight } = main;
  const { offsetX, offsetY } = event;
  const c_width = parseInt(getComputedStyle(canvas).width);
  const c_height = parseInt(getComputedStyle(canvas).height);
  console.log(c_height, c_width);

  const c_x = c_width >= cv_w ? offsetX : offsetX * cv_w / clientWidth - 5;
  const c_y = c_height >= cv_h ? offsetY : offsetY * cv_h / clientHeight - 5;

  canvas.click_timer = setTimeout(() => {
    canvasActions.draw(c_x, c_y);
  }, 0);

}

const canvasActions = {
  /** @type {CanvasRenderingContext2D} */
  ctx: ctx,
  colorIndex: 2,
  colors: ['#000', '#fff', "#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", '#607d8b'],
  draw(x, y) {
    this.ctx.fillStyle = this.colors[this.colorIndex];
    const _x = Math.floor(x / size) * size;
    const _y = Math.floor(y / size) * size;

    this.ctx.fillRect(_x, _y, size, size);

    map.push([Math.floor(x / size), Math.floor(y / size), (Math.random() * size) | 0]);
  },
};

function initColors() {
  const nodes = canvasActions.colors.map((item, index) => {
    const linode = document.createElement('li');
    linode.dataset.index = index;
    linode.style.backgroundColor = item;
    linode.addEventListener('click', function ({ target }) {

      canvasActions.colorIndex = target.dataset.index;
      nodes.forEach(item => {
        item.classList.remove('active')
      });
      target.classList.add('active')
    });
    if (index === 0) {
      linode.classList.add('active');
    }
    return linode;
  });
  document.getElementById('action').append(...nodes);
}

; (function init() {
  initColors();
  main.addEventListener('dblclick', dblclickEvent);
  canvas.addEventListener('click', clickEvent);
})();