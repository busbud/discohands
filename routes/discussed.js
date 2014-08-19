var express = require('express');

var Topic = require('../models/topic');

var router = express.Router();

function getTopics(req, res, next) {
  var page = +req.params.page || 1;

  Topic.getPage({
    where: { discussed: true },
    sort: '-date',
    limit: 10,
    page: page
  }, function(err, topics, pages) {
    if (err) return next(err);
    res.render('discussed', {
      topics: topics,
      page: page,
      pages: pages
    });
  });
}

router.get('/', getTopics);
router.get('/page/:page', getTopics);

module.exports = router;
