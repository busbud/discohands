var express = require('express');

var Topic = require('../models/topic');

var router = express.Router();

function getTopics(req, res, next) {
  var page = +req.params.page || 1;

  Topic.getPage({
    where: { discussed: false },
    sort: '-score date',
    limit: 10,
    page: page
  }, function(err, topics, pages) {
    if (err) return next(err);
    res.render('topics', {
      topics: topics,
      page: page,
      pages: pages
    });
  });
}

router.get('/', getTopics);
router.get('/page/:page', getTopics);

router.get('/new', function(req, res) {
  res.render('new-topic');
});

router.post('/new', function(req, res, next) {
  if (!req.body.title || req.body.title.length > 255) {
    return res.status(400).render('error', {
      message: 'Title missing or too long.'
    });
  }
  if (req.body.description && req.body.description.length > 1024) {
    return res.status(400).render('error', {
      message: 'Description too long.'
    });
  }

  var topic = new Topic({
    title: req.body.title,
    description: req.body.description,
    email: req.user.email,
    score: 1,
    votes: [ req.user.email ]
  });
  topic.save(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.post('/:id/vote', function(req, res, next) {
  Topic.vote(req.params.id, req.user.email, function(err, topic) {
    if (err) return next(err);
    if (topic) {
      res.status(200).send('Voted');
    } else {
      res.status(400).send('Invalid topic');
    }
  });
});

router.post('/:id/unvote', function(req, res, next) {
  Topic.unvote(req.params.id, req.user.email, function(err, topic) {
    if (err) return next(err);
    if (topic) {
      res.status(200).send('Unvoted');
    } else {
      res.status(400).send('Invalid topic');
    }
  });
});

router.post('/:id/discuss', function(req, res, next) {
  Topic.discuss(req.params.id, function(err, topic) {
    if (err) return next(err);
    if (topic) {
      res.status(200).send('Discussed');
    } else {
      res.status(400).send('Invalid topic');
    }
  });
});

router.post('/:id/undiscuss', function(req, res, next) {
  Topic.undiscuss(req.params.id, function(err, topic) {
    if (err) return next(err);
    if (topic) {
      res.status(200).send('Undiscussed');
    } else {
      res.status(400).send('Invalid topic');
    }
  });
});

module.exports = router;
