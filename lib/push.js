var clients = {};
exports.initSocketServer = function() {
  var net = require('net');
  net.createServer(function(socket) {
    var timer = setTimeout(function() {
      if (!socket.userId) {
        socket.end();
      }
    }, 5000);

    socket.on('data', function(data) {
      var hi = JSON.parse(data);
      var mongoose = require('mongoose');

      mongoose.model('User').findOne({
        tel: hi.tel,
        password: hi.password
      }, function(err, user) {
        if (err || !user) {
	        socket.end();
				} else {
          socket.userId = user._id;
          clients[socket.userId] = socket;
          clearTimeout(timer);
        }
      });
    });

    socket.on('end', function() {
      if (socket.userId)
        clients[socket.userId] = null;
    });

  }).listen(9797);
}

exports.notifyUserNewMessage = function(uid) {
  var socket = clients[uid];
  if (socket) {
    socket.write('1');
  }
}
