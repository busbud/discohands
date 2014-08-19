var mongoose = require('mongoose');

var topic_schema = mongoose.Schema({
  title:       String,
  description: String,
  email:       String,
  date:        { type: Date, default: Date.now },
  score:       Number,
  votes:       [ String ],
  discussed:   { type: Boolean, default: false }
});

var Topic = mongoose.model('Topic', topic_schema);

module.exports = Topic;
