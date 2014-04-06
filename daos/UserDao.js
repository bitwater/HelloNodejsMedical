var User = require('../models/User');

var UserDAO = function () {
};

UserDAO.prototype.add = function (obj, callback) {
    var instance = new User(obj);
    instance.save(function (err) {
        if (err) {
            Console.log("Fail save User" + err);
            callback(err);
        } else {
            callback(null);
        }
    })
}

UserDAO.prototype.findByName = function (username, callback) {
    User.findOne({name: username}, function (err, doc) {
        callback(err, doc);
    });
};

UserDAO.prototype.delete = function (id, callback) {
    findUserById(id, function (err, doc) {
        if (err)
            callback(err);
        else {
            console.log(doc);
            doc.remove();
            callback(null);
        }
    });
}

UserDAO.prototype.getAllUsers = function (callback) {
    User.find({}, callback);
}

UserDAO.prototype.forAll = function (doEach, done) {
    User.find({}, function (err, docs) {
        if (err) {
            console.log('FATAL ' + err);
            done(err, null);
        }
        docs.forEach(function (doc) {
            doEach(null, doc);
        });
        done(null);
    });
}

var findUserById = function (id, callback) {
    User.findOne({_id: id}, function (err, doc) {
        if (err) {
            console.log('FATAL ' + err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

module.exports = new UserDAO();