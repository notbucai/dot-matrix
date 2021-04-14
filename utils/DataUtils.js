const direction = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, 1], [1, -1]];//方向数组
/*
    去重复
*/
function duplicateRemoval (content) {
  var endContent = [];
  var obj = {};
  for (var dot of content) {
    const key = dot[0] + '-' + dot[1];
    if (!obj[key]) {
      obj[key] = 1;
      if (dot[2] !== 1) {
        endContent.push(dot);
      }
    }
  }
  return { myMap: obj, content: endContent };
}

function dfs (myMap, dot) {
  const dotKey = dot[0] + '-' + dot[1];
  if (myMap[dotKey] === 2) { //检查先前是否搜到过
    return true;
  }
  for (let i = 0; i < direction.length; i++) {
    let x = dot[0] + direction[i][0];
    let y = dot[1] + direction[i][1];
    if (x > 0 && x < 400 && y > 0 && y < 200) {
      const key = x + '-' + y;
      if (myMap[key]) {
        myMap[key] = 2; //有状态记录为2
        myMap[dotKey] = 2;
        return true;
      }
    }
  }
  return false;
}

/*
过滤
*/
function filter (myMap, content) {
  let endContent = [];
  for (let i = 0; i < content.length; i++) {
    if (dfs(myMap, content[i])) {
      endContent.push(content[i]);
    }
  }

  return endContent
}

function filterRubbish (data) {
  const _map = [];
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

  data.forEach(p => {
    if (!map[p[0]]) map[p[0]] = [];
    map[p[0]][p[1]] = true;
  });

  const newData = data.filter(p => {

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

  return newData;
}

module.exports = {
  duplicateRemoval,
  filter,
  filterRubbish
}