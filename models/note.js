const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({

    note : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});


module.exports = mongoose.model('Note', noteSchema);