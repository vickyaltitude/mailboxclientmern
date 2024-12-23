const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = new Schema({
    userName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users',Users)