var mongoose = require('mongoose');

var mongo_url =
  process.env.MONGOLAB_URL ||
  process.env.MONGODB_URL ||
  'mongodb://localhost/discohands';

mongoose.connect(mongo_url);

module.exports = function(done) {
  mongoose.connection.once('open', done);
};
