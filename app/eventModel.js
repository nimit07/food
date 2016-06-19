"use strict";

const mongoose = require('mongoose');


const Schema = mongoose.Schema;

var EventSchema = new Schema({
    organiser: {
        type: "string",
        required: true
    },
    name: {
        type: "string"
    },
    foodCategory: {
        type: "string",
        enum: ['veg', 'non_veg', 'both'],
        required: true
    },
    maxCapacity: {
        type: "number",
        required: true
    },

    timing: {
        type: {
            time: {
                type: "string"
            },
            date: {
                type: "string"
            }
        }
    },

    address: {
        type: {
            streetAddress: {
                type: "string",
                required: true
            },
            landMark: {
                type: "string"
            },
            city: {
                type: "string",
                required: true
            },
            location: {
                type: {
                    lat: {
                        type: "string",
                        required: true
                    },
                    lon: {
                        type: "string",
                        required: true
                    }
                },
                required: true
            }

        }
    },

    dishes: {
        type: [{
            name: {
                type: "string",
                required: true
            },
            category: {
                type: "string",
                enum: ['veg', 'non_veg', 'both'],
                required: true
            }
        }]
    }
}, {strict: true});


module.exports = mongoose.model('Event', EventSchema);





