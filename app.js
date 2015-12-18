var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/user');
var messages = require('./routes/message');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var MongoStore = require('connect-mongostore')(session);
app.use(session({
  secret: "yiitz",
  key: 'sid',
  store: new MongoStore({
    db: 'chat'
  }),
  resave: true,
  saveUninitialized: true,
}))

var connection = mongoose.connect('mongodb://localhost/chat');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
// bootstrap models
require('./models');

/*
app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && !req.session.userId) {
        return res.redirect("/login");
    }
    next();
});
*/
app.use('/', routes);
app.use('/user', users);
app.use('/message', messages);

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

var push = require('./lib/push');
push.initSocketServer();

module.exports = app;
