/**
 * Created by norway on 14-3-30.
 */
var util = require('util');
var mongodb = require('./../mongodb');
var Schema = mongodb.mongoose.Schema;

/**
 * @type {Schema}
 *
 * Schema  ：  一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
 *
 * Model   ：  由Schema发布生成的模型，相当于管理数据库属性和行为的类
 *
 * Entity  ：  由Model创建的实体，它的操作也会影响数据库
 */
var doctorSchema = new Schema({
    username: String,
    name: String,
    city: String,
    hospital: String,
    prof_title: String,
    telnumber: Number,
    specialty: String,
    community: String,
    create_date: {type: Date, default: Date.now},
    images: {
        coverSmall: String,
        coverBig: String
    },
    introduction: String
});

// 创建doctor的mongodb模型
var Doctor = mongodb.mongoose.model('doctor', doctorSchema);

module.exports = Doctor;
