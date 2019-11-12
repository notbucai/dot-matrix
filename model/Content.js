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
    return Content.updateOne({ name: version }, { $addToSet: { content: [dot] } });
  } else {
    return (await Content.findOne({ name: version })).content;
  }
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
  consola.success("GetSuccess:", data.content);
})();