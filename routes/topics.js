var express = require('express');

var Topic = require('../models/topic');

var router = express.Router();

router.get('/', function(req, res, next) {
  // TODO: Pagination
  Topic
    .find({ discussed: false })
    .sort('-score date')
    .limit(10)
    .exec(function(err, topics) {
      if (err) return next(err);
      res.render('topics', {
        topics: topics
      });
    });
});

router.get('/new', function(req, res) {
  res.render('new-topic');
});

router.post('/new', function(req, res, next) {
  // TODO: Better error reporting
  if (!req.body.title || req.body.title.length > 255) {
    return res.status(400).send('Title missing or too long');
  }
  if (req.body.description && req.body.description.length > 1024) {
    return res.status(400).send('Description too long');
  }

  var topic = new Topic({
    title: req.body.title,
    description: req.body.description,
    email: req.session.user.email,
    score: 1,
    votes: [ req.session.user.email ]
  });
  topic.save(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.post('/:id/upvote', function(req, res, next) {
  // Try to un-upvote first, upvote if no match
  Topic.findOneAndUpdate({
    _id: req.params.id,
    votes: req.session.user.email
  }, {
    $inc: { score: -1 },
    $pull: { votes: req.session.user.email }
  }, function(err, topic) {
    if (err) return next(err);

    if (topic) {
      res.status(200).send('Upvote removed');
    } else {
      Topic.findOneAndUpdate({
        _id: req.params.id,
        votes: { $ne: req.session.user.email }
      }, {
        $inc: { score: 1 },
        $push: { votes: req.session.user.email }
      }, function(err, topic) {
        if (err) return next(err);

        if (topic) {
          res.status(200).send('Upvoted');
        } else {
          res.status(404).send('Topic not found');
        }
      });
    }
  });
});

module.exports = router;
