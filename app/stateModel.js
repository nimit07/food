"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var StateSchema = new Schema({
    name: {
        type: String,
        required: true
    }


}, {strict: true});



module.exports = mongoose.model('State', StateSchema);
