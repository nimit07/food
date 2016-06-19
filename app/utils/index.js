"use strict";
const chance = require('chance').Chance();
module.exports.md5Hash = function md5Hash(string) {
    let crypto = require('crypto');
    let md5Sum = crypto.createHash('md5');

    if (!string) {
        string = module.exports.randomString();
    }

    md5Sum.update(string);

    return md5Sum.digest('hex');
};

module.exports.randomString = function randomString(lenght, charset) {
    let options = {};

    if (lenght) {
        options.length = lenght;
    }

    if (charset) {
        options.pool = charset;
    }

    return chance.string(options);
};