var express = require('express');

var authRoutes      = require('./auth');
var topicRoutes     = require('./topics');
var discussedRoutes = require('./discussed');
var mineRoutes      = require('./mine');

var router = express.Router();

router.use('/auth', authRoutes);

router.get('/', function(req, res, next) {
  if (req.user) {
    topicRoutes(req, res, next);
  } else {
    res.render('login');
  }
});

router.get('/unauthorized', function(req, res) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('unauthorized');
  }
});

// All other routes require auth
router.use(function(req, res, next) {
  if (!req.user) {
    return res.render('unauthorized');
  }
  next();
});

router.use('/topics', topicRoutes);
router.use('/discussed', discussedRoutes);
router.use('/mine', mineRoutes);

module.exports = router;
