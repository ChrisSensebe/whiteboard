var express          = require('express');
var path             = require('path');
var favicon          = require('serve-favicon');
var logger           = require('morgan');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
// router
var routes           = require('./routes/index');
// sessions & authenticating
var passport         = require('passport');
// passwortd init
var initPassword     = require('./passport/init'); 
var expressSession   = require('express-session');
// database
var mongoose         = require('mongoose');
// config file: config.js
var config           = require('./config');
// using flash middleware to store messages in session
var flash            = require('connect-flash');
// csurf against csrf
var csurf            = require('csurf');

// application
var app              = express();


// database connection
mongoose.connect(config.databaseUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// routes
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// session & authenticating
app.use(expressSession({
  secret: config.secret,
  saveUninitialized: true,
  resave: true}));
app.use(csurf());
app.use(passport.initialize());
app.use(passport.session());

// initializing password
initPassword(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
