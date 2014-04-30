var logger = require('../log4js').getLogger('routes.member');

exports.home = function (req, res) {
    res.render('home', {title: 'Home', user: req.session.user});
}

exports.showMember = function (req, res) {
    logger.info(req.params.id);
    var id = req.params.id;
    if (id) {
        // 展示该医生的详细信息
        doctor.findById(id, function (err, obj) {
            if (err) {
                req.session.error = '展示医生信息失败,请重试';
            } else {
                req.session.success = '展示信息成功';
                return res.send(obj);
            }
        });

    } else {
        // 医生信息首页
        /* return res.render('doctor', {
         title: '医生信息',
         label: '医生:',
         doctor: false
         });*/

        return res.redirect('/home');
    }
};

exports.doAddMember = function (req, res) {
    logger.info(req.body);
    var obj = req.body;
    var id = req.params.id;

    if (id) {
        doctor.update(id, obj, function (err) {
            if (err) {
                req.session.error = '更新医生信息失败,请重试';
            } else {
                req.session.success = '更新医生信息成功';
                return res.redirect('/home');
            }
        });
    } else {
        doctor.add(obj, function (err) {
            if (err) {
                req.session.error = '添加医生信息失败,请重试';
            } else {
                req.session.success = '添加医生信息成功';
                return res.redirect('/home');
            }
        });
    }

};

exports.addMember = function (req, res) {
    logger.info(req.params.id);
    if (req.params.id) {
        // 更新
        return res.render('member', {
            title: '编辑医生信息',
            label: '编辑医生:'
//            doctor: req.params.id
        });
    } else {
        // 新增
        return res.render('member', {
            title: '新增医生信息',
            label: '新增医生:',
            doctor: false
        });
    }
};
