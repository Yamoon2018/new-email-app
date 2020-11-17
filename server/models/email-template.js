const mongoose = require('mongoose');

const emailTemplate = new mongoose.Schema({
    sender_name:{
        type:String,
        required:true
    },
    sender_email:{
        type:String,
        required:true
    },
    receiver_name:{
        type:String,
        required:true
    },
    receiver_email:{
        type:String,
        required:true
    },
    email_subject:{
        type:String,
        required:true
    },
    email_body:{
        type:String,
        required:true
    },
    email_attachment:{
        type:String,
        required:false
    },
    email_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('my_email', emailTemplate);