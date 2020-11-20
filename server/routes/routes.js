const express = require('express');
const router = express.Router();
const email_template = require('../models/email-template');
const send_email_db = require('./send_email_smtp');

var helper = require('sendgrid').mail;
var from_email = new helper.Email('yamin.barakat@gmail.com');
var to_email = new helper.Email('yamin.barakat@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});


router.post('/save_db', (req, res)=>{
    console.log("body=="+req.body);
    res.render(req.body);
    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
        if(error){
            console.log(error);
        }
      });
    // console.log("req body ==");
    // console.log(req.body);
    // send_email_db(req.body);
    // const new_email_template = new email_template({
    //     sender_name: req.body.sender_name,
    //     sender_email: req.body.sender_email,
    //     receiver_name: req.body.receiver_name,
    //     receiver_email: req.body.receiver_email,
    //     email_subject: req.body.email_subject,
    //     email_body: req.body.email_body,
    //     email_attachment: req.body.email_attachment || null
    // })
    // new_email_template.save()
    // .then(data => {
    //     console.log("email temp=="+data);
    //     res.json(data);
        
        
    // })
    // .catch(error => {
    //     res.json(error);
    // })
    // console.log("email temp=="+new_email_template);
    // send_email_db(new_email_template);
});

module.exports=router;