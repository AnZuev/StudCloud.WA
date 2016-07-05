var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file("waConfig", {file: path.join(__dirname, 'config.json')});

module.exports = nconf;
