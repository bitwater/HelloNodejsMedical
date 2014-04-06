/**
 * Created by norway on 14-4-5.
 *
 * 路由控制模块
 */
var index = require('./index')
var doctor = require('./doctor');
var user = require('./user');

exports.routes = function(app){
    // 首页
    app.get('/', index.index);

    // 用户信息相关
    app.get('/home', authentication);
    app.get('/home', user.home);

    // 登录
    app.all('/login', noAuthentication);
    app.get('/login', user.login);
    app.post('/login', user.doLogin);

    // 退出
    app.get('/logout', authentication);
    app.get('/logout', user.logout);

    // 注册
    app.all('/reg', noAuthentication);
    app.get('/reg', user.reg);
    app.post('/reg', user.doReg);

    // 医生信息相关
    // 添加和更新
    app.get('/doctor/show/:id', doctor.showDoctor);

    app.all('/doctor/add', authentication);
    app.get('/doctor/add', doctor.addDoctor);
    app.post('/doctor/add', doctor.doAddDoctor);
    app.get('/doctor/add/:id', doctor.addDoctor);
    app.post('/doctor/add/:id', doctor.doAddDoctor);

    // 查询
    app.all('/doctor/query/', authentication);
    app.get('/doctor/query/', doctor.findAllDoctor);
    app.get('/doctor/query/:name', doctor.findDoctorByName);

    // 删除
    app.get('/doctor/delete/:id', doctor.deleteDoctor);
}

// 认证访问控制
// 未认证
function authentication(req, res, next) {
    if (!req.session.user) {
        req.session.error = '请先登录';
        return res.redirect('/login');
    }
    next();
}

// 已认证
function noAuthentication(req, res, next) {
    if (req.session.user) {
        req.session.error = '已登录';
        return res.redirect('/home');
    }
    next();
}