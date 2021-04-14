const ps = require('./ps.json');
const fs = require('fs');
const _map = [];
console.time();
const map = new Proxy(_map, {
  get (obj, prop) {
    if (!obj[prop]) {
      obj[prop] = [];
    }
    return obj[prop] || [];
  },
  set (obj, prop, value) {
    obj[prop] = value;
    return true;
  }
});

ps.forEach(p => {
  if (!map[p[0]]) map[p[0]] = [];
  map[p[0]][p[1]] = true;
});

const newPs = ps.filter(p => {

  const x = p[0], y = p[1];

  const x1y0 = map[x + 1][y];
  const x0y_1 = map[x][y - 1];
  const x_1y0 = map[x - 1][y];
  const x0y1 = map[x][y + 1];

  const x1y1 = map[x + 1][y + 1];
  const x1y_1 = map[x + 1][y - 1];
  const x_1y_1 = map[x - 1][y - 1];
  const x_1y1 = map[x - 1][y + 1];

  if (x1y0 || x0y_1 || x_1y0 || x0y1 || x1y1 || x1y_1 || x_1y_1 || x_1y1) {
    return true;
  }

  return false;
});
console.timeEnd();


fs.writeFileSync('./newps.json', JSON.stringify(newPs));

console.log('length %s, %s', newPs.length, ps.length);