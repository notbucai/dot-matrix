const main = document.getElementById('main');

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cv_w = canvas.width;
const cv_h = canvas.height;

const size = 20;

/**
 * 双击
 */
const moveObj = new Move(canvas);

const ctxAction = new CtxAction(ctx, size);

const socket = new Socket(function (dot) {
  ctxAction.draw(...dot);
});

/**
 * 耦合性太高 
 */
const eventlist = {
  dbclickStatus: false,
  click_timer: null,

  updateEvent(event) {
    moveObj.update(event.offsetX, event.offsetY);
  },
  mouseupEvent() {
    main.removeEventListener('mousemove', eventlist.updateEvent);
    document.removeEventListener('mouseup', eventlist.mouseupEvent);
  },
  mousedownEvent(event) {
    if (event.button === 0) {
      moveObj.init(event.offsetX, event.offsetY);
      main.addEventListener('mousemove', eventlist.updateEvent);
    }
    document.addEventListener('mouseup', eventlist.mouseupEvent);
  },
  dblclickEvent(event) {
    clearTimeout(eventlist.click_timer);
    if (!eventlist.dbclickStatus) {
      canvas.style.width = cv_w + 'px';
      canvas.style.height = cv_h + 'px';
      const { clientWidth, clientHeight } = main;
      // 双击放大指定区域
      canvas.style.left = -(event.offsetX * cv_w / clientWidth - event.offsetX) + 'px';
      canvas.style.top = -(event.offsetY * cv_h / clientHeight - event.offsetY) + 'px';

      main.addEventListener('mousedown', eventlist.mousedownEvent);
    } else {
      canvas.style.left = 0;
      canvas.style.top = 0;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      main.removeEventListener('mousedown', eventlist.mousedownEvent);
    }
    eventlist.dbclickStatus = !eventlist.dbclickStatus;
  },
  clickEvent(event) {
    clearTimeout(eventlist.click_timer);
    const { clientWidth, clientHeight } = main;
    const { offsetX, offsetY } = event;
    const c_width = parseInt(getComputedStyle(canvas).width);
    const c_height = parseInt(getComputedStyle(canvas).height);
    console.log(c_height, c_width);

    const c_x = c_width >= cv_w ? offsetX : offsetX * cv_w / clientWidth - 5;
    const c_y = c_height >= cv_h ? offsetY : offsetY * cv_h / clientHeight - 5;

    eventlist.click_timer = setTimeout(() => {
      const dot = ctxAction.draw(Math.floor(c_x / size), Math.floor(c_y / size));
      socket.dot(dot);
    }, 0);
  }
}


// 初始化 颜色操作栏
function initColors() {
  const nodes = ctxAction.colors.map((item, index) => {
    const linode = document.createElement('li');
    linode.dataset.index = index;
    linode.style.backgroundColor = item;
    linode.addEventListener('click', function ({ target }) {

      ctxAction.colorIndex = parseInt(target.dataset.index);
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

function initCanvas() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function (event) {
    if (this.readyState === 4) {
      const map = JSON.parse(xhr.responseText);
      map.forEach(dot => {
        if (Array.isArray(dot) && !Number.isNaN(parseInt(JSON.stringify(dot).replace(/\[|\]|,/g, '')))) {
          ctxAction.draw(...dot);
        }
      });
    }
  });
  xhr.open('GET', '/api');
  xhr.send();
}

; (function init() {
  initColors();
  initCanvas();
  main.addEventListener('dblclick', eventlist.dblclickEvent);
  canvas.addEventListener('click', eventlist.clickEvent);

  // for (let i = 0; i < map.length; i++) {
  //   const item = map[i];
  //   const [y, x] = item;
  //   // ctxAction.draw(x + 160, y + 20, (6));
  //   end_map[0].push([x + 30, y + 50, (Math.random() * ctxAction.colors.length) | 0]);
  // }

  // console.log(JSON.stringify(end_map));

  // end_map.forEach(charDot => {
  //   charDot.forEach(([x, y, c]) => {
  //     // ctxAction.draw(x, y, c);
  //     // socket.dot([x, y, c]);
  //   });
  // });

})();