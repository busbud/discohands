var async    = require('async');
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

topic_schema.statics.getPage = function(args, done) {
  var self = this;
  async.parallel({
    count: function(step) {
      self.count(args.where, step);
    },
    topics: function(step) {
      self
        .find(args.where)
        .sort(args.sort)
        .limit(args.limit)
        .skip((args.page - 1) * args.limit)
        .exec(step);
    }
  }, function(err, results) {
    done(err, results.topics, Math.ceil(results.count / args.limit));
  });
}

var Topic = mongoose.model('Topic', topic_schema);

module.exports = Topic;
