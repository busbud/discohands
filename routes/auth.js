var express = require('express');
var request = require('superagent');

var VERIFIER_URL = 'https://verifier.login.persona.org/verify';

var router = express.Router();

router.post('/login', function(req, res, next) {
  if (!req.body.assertion) {
    return res.status(400).send('Missing assertion');
  }

  request.post(VERIFIER_URL)
    .send({
      assertion: req.body.assertion,
      audience: process.env.ROOT_URL || 'http://localhost'
    })
    .end(function(err, vres) {
      if (err) return next(err);

      var verification = vres.body;
      if (verification.status !== 'okay') {
        return res.status(403).send('Assertion verification failed');
      }

      var email_domain = verification.email.split('@')[1].toLowerCase();
      if (email_domain !== process.env.AUTHORIZED_DOMAIN) {
        return res.status(403).send('Domain not authorized');
      }

      req.session.user = { email: verification.email };
      res.status(200).send('Assertion verification okay');
    });
});

router.post('/logout', function(req, res) {
  delete req.session.user;
  res.status(200).send('Logout okay');
});

module.exports = router;
