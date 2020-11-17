const express = require('express');
const router = express.Router();
const email_template = require('../models/email-template');


router.post('/save_db', (req, res)=>{
    const new_email_template = new email_template({
        sender_name: req.body.sender_name,
        sender_email: req.body.sender_email,
        receiver_name: req.body.receiver_name,
        receiver_email: req.body.receiver_email,
        email_subject: req.body.email_subject,
        email_body: req.body.email_body,
        email_attachment: req.body.email_attachment || null
    })
    new_email_template.save()
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        res.json(error);
    })
});

module.exports=router;