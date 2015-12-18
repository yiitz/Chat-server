exports.authorize = function(req, res, next) {
  if (!req.session.userId) {
    res.send('need login');
  } else {
    next();
  }
}