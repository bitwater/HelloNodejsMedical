var crypto = require('crypto');
var User = require('../daos/UserDao');
var logger = require('../log4js').getLogger('routes.user');

exports.home = function (req, res) {
    res.render('home', {title: 'Home', user: req.session.user});
}

// 登录
exports.login = function (req, res) {
    res.render('login', { title: '用户登录'});
}

exports.doLogin = function (req, res) {
    // 生成口令的散列值
    logger.info(req.body.content);
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    // 根据用户名查找
    User.findByName(req.body.username, function(err, user) {
        logger.info("find this user" + user);
        if (!user) {
            req.session.error = '用户不存在';
            return res.redirect('/login');
        }

        if (user.password !== password) {
            req.session.error = '用户名或密码不正确';
            return res.redirect('/login');
        }
        req.session.user = user;
        req.session.success = '登录成功';
        res.redirect('/home');
    });


}

// 注销
exports.logout = function (req, res) {
    req.session.user = null;
    res.redirect("/");
}


// 注册
exports.reg = function(req, res) {
    res.render('reg', {
        title: '用户注册'
    });
};

exports.doReg = function(req, res) {
    //检验用戶兩次輸入的口令是否一致
    if (req.body.password_repeat !== req.body.password) {
        req.session.error = '两次输入的密码不一致';
        return res.redirect('/reg');
    }

    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = {
        name: req.body.username,
        password: password
    };

console.log(newUser);
    //检查用戶名是否已经存在
    User.findByName(newUser.name, function(err, user) {
        if (user) err = '用户名已存在';
        if (err) {
            req.session.error =  err;
            return res.redirect('/reg');
        }
        //如果不存在则新增用戶
        User.add(newUser, function(err) {
            if (err) {
                req.session.error = err;
                return res.redirect('/reg');
            }
            req.session.user = user;
            req.session.success =  '注册成功';
            res.redirect('/login');
        });
    });
};
