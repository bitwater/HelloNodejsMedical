var log4js = require('log4js');

log4js.configure({
    //控制台输出
    appenders: [
        { type: 'console' },{
            type: 'file',
            filename: 'logs/app.log',
            maxLogSize: 1024,
            backups:4,
            category: 'normal'
        }
    ],
//    replaceConsole: true
    replaceConsole: true,   //替换console.log  
    levels: {
        dateFileLog: 'INFO'
    }
});

exports.getLogger = function (name) {
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
}

exports.use = function (app, logger) {
    //页面请求日志,用auto的话,默认级别是WARN  
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));  
    app.use(log4js.connectLogger(logger, {level: 'info', format: ':method :url'}));
}  