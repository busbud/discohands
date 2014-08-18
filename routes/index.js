var express = require('express');

var authRoutes = require('./auth');

var router = express.Router();

router.use('/auth', authRoutes);

router.get('/', function(req, res) {
  console.log(req.session);
  res.render('login');
});

module.exports = router;
