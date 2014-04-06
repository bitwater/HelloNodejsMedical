/**
 * Created by norway on 14-4-5.
 */
var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' },{
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups:4,
            category: 'normal'
        }
    ],
    replaceConsole: true
});

exports.logger=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
}