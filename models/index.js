var fs = require('fs');

readDir(__dirname, function(file) {
  require(__dirname + '/' + file);
});

function readDir(dir, handler) {
  fs.readdirSync(dir).forEach(function(file) {
    if (/(.*)\.(js$|coffee$)/.test(file) && file !== 'index.js') {
      handler(file);
    }
  });
}
