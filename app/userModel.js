"use strict";

const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
var utils = require('./utils');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: {
            first: {
                type: String,
                required: true
            },
            last: {
                type: String
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String
    },
    password: {
        type: String,
        'default': ''
    },
    isAdmin: {
        type: Boolean,
        'default': false

    }
}, {strict: true,hide:'password '});



/*---Validations---*/
UserSchema.path('email').validate(function (value) {
    return validator.isEmail(value);
}, 'Invalid Email');

UserSchema.path('mobile').validate(function (value) {
    if (value) {
        return value.length === 10;
    }
}, 'Invalid Mobile');


UserSchema.methods.comparePassword = function (pass) {
    return bcrypt.compareSync(pass, this.password);
};
//UserSchema.methods.isAdmin = function () {
//    return  this.isAdmin;
//};
UserSchema.options.toJSON = {
    transform: function(doc, ret, options) {

        delete ret.password;
        return ret;
    }
};
UserSchema.virtual('name.full').get(function () {
    return (this.name.first+" "+this.name.last);
});




module.exports = mongoose.model('User', UserSchema);