const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname:  {
        type: String,
        required: true
    },
    age: Number
})

module.exports = mongoose.model('Posts', PostSchema);