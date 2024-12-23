const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEmails = new Schema({
    senderEmail: {
        type: String,
        required: true
    },
    recipientEmail:{
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
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    emailOpened: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('UserEmails',userEmails)