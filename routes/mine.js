var express = require('express');

var Topic = require('../models/topic');

var router = express.Router();

function getTopics(req, res, next) {
  var page = +req.params.page || 1;

  Topic.getPage({
    where: { email: req.user.email },
    sort: 'discussed -date',
    limit: 10,
    page: page
  }, function(err, topics, pages) {
    if (err) return next(err);
    res.render('mine', {
      topics: topics,
      page: page,
      pages: pages
    });
  });
}

router.get('/', getTopics);
router.get('/page/:page', getTopics);

router.get('/:id/edit', function(req, res, next) {
  // TODO: Match id properly
  Topic.findById(req.params.id, function(err, topic) {
    if (err) return next(err);

    if (!topic) {
      return res.status(404).render('error', {
        message: 'Topic not found.'
      });
    }

    res.render('edit-topic', {
      topic: topic
    });
  });
});

router.post('/:id/edit', function(req, res, next) {
  // TODO: Validation
  Topic.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description
  }, function(err, topic) {
    if (err) return next(err);
    res.redirect('/mine');
  });
});

router.get('/:id/delete', function(req, res, next) {
  // TODO: Match id properly
  Topic.findById(req.params.id, function(err, topic) {
    if (err) return next(err);

    if (!topic) {
      return res.status(404).render('error', {
        message: 'Topic not found.'
      });
    }

    res.render('delete-topic', {
      topic: topic
    });
  });
});

router.post('/:id/delete', function(req, res, next) {
  Topic.findByIdAndRemove(req.params.id, function(err, topic) {
    if (err) return next(err);
    res.redirect('/mine');
  });
});

module.exports = router;
