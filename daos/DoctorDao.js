/**
 * Created by norway on 14-4-3.
 *
 * 根据mongoose模型封装CRUD操作
 */
var Doctor = require('../models/Doctor');
var logger = require('../log4js').getLogger('daos.DoctorDao');

var DoctorDAO = function () {
};

DoctorDAO.prototype.add = function (obj, callback) {
    var instance = new Doctor(obj);
    instance.save(function (err) {
        if (err) {
            logger.error("Fail save doctor!" + err);
            callback(err);
        } else {
            callback(null);
        }
    })
}

DoctorDAO.prototype.update = function (id, newdoc, callback) {
    findById(id, function (err, doc) {
        if (err) {
            logger.error("Fail find doctor!" + err);
            callback(err);
        } else {
            doc.name = newdoc.name;
            doc.city = newdoc.city;
            doc.hospital = newdoc.hospital;
            doc.prof_title = newdoc.prof_title;
            doc.telnumber = newdoc.telnumber;
            doc.specialty = newdoc.specialty;
            doc.community = newdoc.community;
            doc.images = newdoc.images;
            doc.introduction = newdoc.introduction;
            doc.save(function (err) {
                if (err) {
                    logger.error("Fail update doctor!" + err);
                    callback(err);
                } else
                    callback(null);
            });
        }
    });
}

DoctorDAO.prototype.delete = function (id, callback) {
    findById(id, function (err, doc) {
        if (err) {
            logger.error("Fail delete doctor!" + err);
            callback(err);
        }
        else {
            console.log(doc);
            doc.remove();
            callback(null);
        }
    });
}

DoctorDAO.prototype.findAll = function (callback) {
    Doctor.find({}, callback);
}

DoctorDAO.prototype.findById = function (id, callback) {
    findById(id, callback);
};

DoctorDAO.prototype.findByName = function (name, callback) {
    Doctor.findOne({name: name}, function (err, doc) {
        if (err) {
            logger.error("Fail find doctor!" + err);
            callback(err, null);
        }
        callback(null, doc);
    });
};


DoctorDAO.prototype.findLikeName = function (query, callback) {
    Doctor.find(query, function (err, doc) {
        if (err) {
            logger.error("Fail findLikeName doctor!" + err);
            callback(err, null);
        }
        callback(null, doc);
    });
};

DoctorDAO.prototype.forAll = function (doEach, done) {
    Doctor.find({}, function (err, docs) {
        if (err) {
            logger.error("Fail forAll doctor!" + err);
            done(err, null);
        }
        docs.forEach(function (doc) {
            doEach(null, doc);
        });
        done(null);
    });
}

var findById = function (id, callback) {
    Doctor.findOne({_id: id}, function (err, doc) {
        if (err) {
            logger.error("Fail findById doctor!" + err);
            callback(err, null);
        }
        callback(null, doc);
    });
}


module.exports = new DoctorDAO();