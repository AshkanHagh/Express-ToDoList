const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({

    note : {
        type : String,
        required : true,
        length : {
            min : 5,
            max : 255
        }
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

}, {timestamps : true});


module.exports = mongoose.model('Note', noteSchema);