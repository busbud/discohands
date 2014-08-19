var express = require('express');

var Topic = require('../models/topic');

var router = express.Router();

router.get('/', function(req, res, next) {
  // TODO: Pagination
  Topic
    .find({ discussed: true })
    .sort('-date')
    .limit(10)
    .exec(function(err, topics) {
      if (err) return next(err);
      res.render('discussed', {
        topics: topics
      });
    });
});

module.exports = router;
