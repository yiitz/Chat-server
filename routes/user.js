var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var check = require('express-check');
var rule = check.rule;

router.post('/login', check(
  'body',
  rule('tel').notEmpty(),
  rule('password').notEmpty()
), function(req, res, next) {
  var tel = req.body.tel;
  var password = req.body.password;
  mongoose.model('User').findOne({
    tel: tel,
    password: password
  }, function(err, user) {
    if (err || !user) {
      res.send('bad');
    } else {
      req.session.userId = user._id;
      res.json(user);
    }
  });
});

router.post('/add', check(
  'body',
  rule('tel').notEmpty(),
  rule('password').notEmpty()
), function(req, res, next) {
  var tel = req.body.tel;
  var password = req.body.password;
  mongoose.model('User').create({
    tel: tel,
    password: password
  }, function(err, user) {
    if (err) return next(err);
    res.send('ok');
  });
});

module.exports = router;
