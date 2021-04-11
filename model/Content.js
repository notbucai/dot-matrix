const mongoose = require('../mongodb/db');
const consola = require('consola');
const { duplicateRemoval, filter } = require('../utils/DataUtils')
const version = 'v1';
const ContentSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    // unique: true,
    index: true
  },
  content: Array
});

ContentSchema.statics.content = async function (dot) {
  if (Array.isArray(dot) && dot.length === 3) {
    return Content.updateOne({ name: version }, { $push: { content: [dot] } });
  } else {
    return this.dotset();
  }
}

ContentSchema.statics.dotset = async function () {

  console.time("content find");
  const item = await Content.findOne({ name: version }).lean(false);
  const content = item.content.reverse();
  console.timeEnd("content find");

  consola.info("content=>", content.length);
  console.time('duplicateRemoval');
  const obj = duplicateRemoval(content);
  console.timeEnd('duplicateRemoval');
  console.time('filter');
  const endContent = obj.content || filter(obj.myMap, obj.content);
  console.timeEnd('filter');
  consola.info("endContent=>", endContent.length);
  // console.log('time=>', Date.now() - start);
  // 简单的清空一下内存
  obj.myMap = null;
  obj.content = null;
  return endContent;
}

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;

(async () => {
  consola.info('Getting');
  let data = await Content.findOne({ name: version });
  if (!data) {
    const content = new Content({
      name: version,
      content: []
    });
    data = await content.save();
  }
  consola.success("GetSuccess:", data.content.length);
})();