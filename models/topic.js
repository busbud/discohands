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
};

topic_schema.statics.vote = function(id, email, done) {
  this.findOneAndUpdate({
    _id: id,
    votes: { $ne: email }
  }, {
    $inc: { score: 1 },
    $push: { votes: email }
  }, done);
};

topic_schema.statics.unvote = function(id, email, done) {
  this.findOneAndUpdate({
    _id: id,
    votes: email
  }, {
    $inc: { score: -1 },
    $pull: { votes: email }
  }, done);
};

topic_schema.statics.discuss = function(id, done) {
  this.findOneAndUpdate({
    _id: id,
    discussed: false
  }, {
    $set: { discussed: true }
  }, done);
};

topic_schema.statics.undiscuss = function(id, done) {
  this.findOneAndUpdate({
    _id: id,
    discussed: true
  }, {
    $set: { discussed: false }
  }, done);
};

var Topic = mongoose.model('Topic', topic_schema);

module.exports = Topic;
