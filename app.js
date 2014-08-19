var fs = require('fs');

var _            = require('lodash');
var moment       = require('moment');
var express      = require('express');
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var compression  = require('compression');
var errorHandler = require('errorhandler');
var session      = require('express-session');
var RedisStore   = require('connect-redis')(session);

var redis  = require('./lib/redis');
var mongo  = require('./lib/mongo');
var routes = require('./routes');

if (fs.existsSync('locals.json')) {
  _.assign(process.env, JSON.parse(fs.readFileSync('locals.json')));
}

var app = express();

app.set('view engine', 'jade');

app.locals.moment = moment;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static('public'));
app.use(session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// Expose session to views
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(routes);

if (process.env.NODE_ENV !== 'production') {
  app.use(errorHandler());
}

mongo(function() {
  var server = app.listen(process.env.PORT || 8080, function() {
    console.log('listening on port %d', server.address().port);
  });
});
