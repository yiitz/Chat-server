var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var filter = require('./lib/loginFilter');
var check = require('express-check');
var rule = check.rule;

router.get('/get/:time', filter.authorize, function(req, res, next) {
	var time = req.params.time || new Date();
  var uid = req.session.userId;
	mongoose.model('Message').find({
      $or: [{sender: uid}, {receiver: uid}],
      time: {$gte: time},
    })
    .limit(50).exec(function(err, msgs) {
		if(err){
			res.send('bad');
		}else{
			res.json(msgs);
		}
	});
});

router.post('/add', filter.authorize, check(
  'body',
  rule('content').notEmpty(),
  rule('receiver').notEmpty()
), function(req, res, next) {
  var content = req.body.content;
  var receiver = req.body.receiver;
  var sender = req.session.userId;
  mongoose.model('Message').create({
    content: content,
    sender: sender,
    receiver: receiver
  }, function(err, message) {
    if (err) return next(err);
    res.send('ok');
  });
});

module.exports = router;
