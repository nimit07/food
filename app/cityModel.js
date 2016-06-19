"use strict";

const mongoose = require('mongoose');


const Schema = mongoose.Schema;

var CitySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    state: {
        type: Schema.Types.ObjectId,
        ref: 'State'
    }
}, {strict: true});



module.exports = mongoose.model('City', CitySchema);
