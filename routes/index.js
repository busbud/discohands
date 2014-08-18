var express = require('express');

var authRoutes = require('./auth');

var router = express.Router();

router.use('/auth', authRoutes);

router.get('/', function(req, res) {
  res.render('login');
});

router.get('/unauthorized', function(req, res) {
  res.render('unauthorized');
});

module.exports = router;
