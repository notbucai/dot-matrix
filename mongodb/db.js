const mongoose = require('mongoose');
const addr = process.env.NODE_ENV === 'production' ? 'bucai-mongo' : 'localhost';

mongoose.connect(`mongodb://${addr}/lattice`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;