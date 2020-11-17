var express = require('express');
var nodemail = require('nodemailer');
var router = express.Router();



router.get('/emails', async (req, res)=> {
    console.log('pass from here');
    var qry = 'select * from my_data';
          mysqlconnection.query(qry, function(err, rows, fields){
          if(err){
              throw err;
          }
          else{
              
              var global_data=[];
              for (var num in rows){                
                  global_data.push(rows[num].email);
              }
              send_email_db(req=null, email_db= global_data)
              res.json(rows);
  
          }
      })  
  }
);

function send_email_db(req, email_db){
    if(req){
        receiver_email = req.body.Email;
    }
    else{
        receiver_email = email_db;
        
    }
    const email_output = `
        <p>your email</p>
        <h3>Your emails sent</h3>
        <ul>
            <li> Email ${receiver_email}</li>
        </ul>
    `;
  
    let tranport_email = nodemail.createTransport({
        service: 'gmail',
        auth: {
            user: 'yamin.barakat@gmail.com',
            pass: ''
        }
    });
  
        
    for(var sent_mail in receiver_email){
        
        let mailoptions = {
            from: "yamin.barakat@gmail.com",
            to: receiver_email[sent_mail],
            subject: "testing 31-10-2020",
            text: "HELLO WORLD",
            html: email_output
        };
    
        tranport_email.sendMail(mailoptions, (err, info)=>{
            if(err) {
                return console.log(err);
            }
            console.log('email sent %s', info.messageId );
        });
    }
  }

  module.exports = router;