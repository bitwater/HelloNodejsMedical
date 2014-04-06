var mongoose = require('mongoose');
var conf = require('./conf');
mongoose.connect(conf.dbUrl);

exports.mongoose = mongoose;