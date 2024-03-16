const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username : {
        type : String,
        required : true,
        unique : true
    },
    note : [{
        type : Schema.Types.ObjectId,
        ref : 'Note',
    }]

}, {timestamps : true});


module.exports = mongoose.model('User', userSchema);