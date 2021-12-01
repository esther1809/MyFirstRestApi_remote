'use strict'
const mongoose = require('mongoose');
const peopleSchema = mongoose.Schema({
    name: {
        type:String
    },
    age:{
        type: Number
    }
})
module.exports = mongoose.model('people',peopleSchema,'people')