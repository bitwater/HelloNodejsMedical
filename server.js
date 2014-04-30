/**
 * Created by norway on 14-4-5.
 */
/**
 * Module dependencies.
 * 模块依赖
 */
var express = require('express');
var conf = require('./conf');
var router = require('./routes/router');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var log4js = require('./log4js');
//var log4js = require('log4js');
var logger = log4js.getLogger('server');
var SessionStore = require('session-mongoose')(express);
var store = new SessionStore({url: conf.sessionDBUrl, interval: 120000});

var app = express();

app.configure(function () {
    // all environments  环境变量及相关配置
    app.set('port', process.env.PORT || conf.port);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
//    app.use(express.favicon());
    //app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.cookieSession({secret: 'norway'}));

    // log4j相关配置
    log4js.use(app, logger);


    // session设置
    app.use(express.session({
        secret: 'norway',
        store: store,
        cookie: {maxAge: 900000}
    }))
    app.use(function (req, res, next) {
        // 提示消息逻辑
        res.locals.error = req.session.error ? req.session.error : null;
        res.locals.success = req.session.success ? req.session.success : null;
        res.locals.user = req.session ? req.session.user : null;

        delete req.session.error;
        delete req.session.success;
        next();
    })

    // 路由配置
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    router.routes(app);

//    app.set('view engine', 'ejs');
    //ejs模板文件扩展为html文件
    app.engine(".html", ejs.__express);
    app.set("view engine", 'html');
});

app.configure('development', function () {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});


// 启动及端口
exports.start = function(){
    http.createServer(app).listen(conf.port, function () {
        logger.info('Express server listening on port ' + app.get('port'));
    });
}
