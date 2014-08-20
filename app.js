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

var config_path = __dirname + '/config.json';
if (fs.existsSync(config_path)) {
  _.defaults(process.env, JSON.parse(fs.readFileSync(config_path)));
}

var redis    = require('./lib/redis');
var mongo    = require('./lib/mongo');
var passport = require('./lib/passport');
var routes   = require('./routes');

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
app.use(passport.initialize());
app.use(passport.session());

// Expose session and user to views
app.use(function(req, res, next) {
  res.locals.session = req.session;
  res.locals.user    = req.user;
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
