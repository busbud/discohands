var express = require('express');
var request = require('superagent');

var passport = require('../lib/passport');

var router = express.Router();

router.get('/google', passport.authenticate('google', { scope: [ 'email' ] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/unauthorized'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
