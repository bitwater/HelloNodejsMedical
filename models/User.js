/**
 * Created by norway on 14-4-2.
 */
var util = require('util');
var mongodb = require('./../mongodb');
var Schema = mongodb.mongoose.Schema;

/**
 * @type {Schema}
 */
var UserSchema = new Schema({
    name: String,
    password: String,
    create_date: {type: Date, default: Date.now}
});

// 创建User的mongodb模型
var User = mongodb.mongoose.model('users', UserSchema);

module.exports = User;