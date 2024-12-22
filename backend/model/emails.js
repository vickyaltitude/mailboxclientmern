const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEmails = new Schema({
    senderEmai: {
        type: String,
        required: true
    },
    receipentEmail:{
        type: String,
        required: true
    },
    emailSubject: {
        type: String,
        required: true
    },
    emailBody:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserEmails',userEmails)