var log4js = require('log4js');

log4js.configure({
    //控制台输出
    appenders: [
        { type: 'console' },{
            type: 'dateFile',
            filename: 'logs/app.log',
            maxLogSize: 1024,
            backups:4,
            category: 'normal'
        },
        {
            type: "dateFile",
            filename: 'logs/app.log',
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: false,
            maxLogSize: 1024*1024
//            category: 'normal'
        }//日期文件格式
    ],

    replaceConsole: true,   //替换console.log
//    levels: {
//        dateFileLog: 'INFO'
//    }
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