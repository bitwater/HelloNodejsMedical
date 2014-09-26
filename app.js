/**
 * Created by norway on 14-3-29.
 */
var server = require('./server');
var moment = require('moment')

server.start();
console.log(moment("2014-5-22 13:23").format())