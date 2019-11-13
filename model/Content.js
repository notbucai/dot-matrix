const mongoose = require('../mongodb/db');
const consola = require('consola');

const version = 'v1';
const ContentSchema = mongoose.Schema({
  name: {
    required: true,
    type: String
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

  const content = ((await Content.findOne({ name: version })).content).reverse();

  consola.info("content=>", content.length);

  const endContent = content.filter((item, index) => {
    return content.findIndex(([x, y]) => {
      return x === item[0] && y === item[1];
    }) === index;
  });

  consola.info("endContent=>", endContent.length);
  return endContent;
}

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;

(async () => {
  consola.info('Getting');
  let data = await Content.findOne({ name: 'v1' });
  if (!data) {
    const content = new Content({
      name: version,
      content: []
    });
    data = await content.save();
  }
  consola.success("GetSuccess:", data.content.length);
})();