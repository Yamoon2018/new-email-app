//const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var nodemail = require('nodemailer');
var mysqlconnection = require('../connection');
var date = new Date();
require('dotenv').config();

/* GET home page. */
router.get('/', (req, res)=>{
  console.log('get is working');
  res.render('index');
});

router.get('/send_email', (req, res)=>{
    console.log("get=="+req.body);
})

router.post('/send_email', (req, res)=>{
  //res.render(req.body);
  console.log("before send==", req.method);
  //var r = toString(req.body.email_status);
  
  //console.log("send==", r.length);
  send_all(req=req, res=res);
});

router.get('/users', function(req, res, next) {
  res.json([
      {id: 1, username: "name1"},
     // {id: 2, username: "name2"},
      {id: 3, username: "name3"}
  ]);
});

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
           // send_email_db( email_db= global_data)
            res.json(rows);

        }
    })  
}
);

//Each button has a function for execution 
function send_all(req , res){

    if(req.body.btn_sendEmail){
        send_email_db(req=req, res);
    }
    
}

function send_email_db(req, res){
  console.log("req=="+ JSON.stringify(req.body));
  //break;
  var receiver_emails='';
  var sender_email='';
    if(req){
      
        sender_email = JSON.stringify(req.body.sender_email);
      receiver_emails = JSON.stringify(req.body.receiver_email).split(',');
        
      var email_status   =  req.body.email_status;
      var email_subject = req.body.email_subject;
      var email_body = req.body.email_body;
      console.log("convert=="+receiver_emails.length); 
      

  }
//   else{
//     receiver_emails = email_db;
      
//   }


  const email_output = `
      
      <h3>Your emails sent ${email_subject}</h3>
      <ul>
          <li> Email ${email_body}</li>
      </ul>
  `;

  let tranport_email = nodemail.createTransport({
    port: ENV['MAILGUN_SMTP_PORT'],
    address: ENV['MAILGUN_SMTP_SERVER'],    
    host: 'https://heroku-email-app.herokuapp.com',
      auth: {
        user: ENV['MAILGUN_SMTP_LOGIN'],
        pass: ENV['MAILGUN_SMTP_PASSWORD'],
      }
  });
  
  var email_counter_start =0;

  email_status === "all" ? receiver_email_list=[receiver_emails] : receiver_email_list = receiver_emails;
     
  while  (email_counter_start < receiver_email_list.length) {
  
    console.log("email options=="+receiver_email_list[email_counter_start]);
      let mailoptions = {
          from: sender_email, //"yamin.barakat@gmail.com",
          to: receiver_email_list[email_counter_start],
          subject: email_subject+'  '+date,
          text: email_body,
          html: email_output
      };
      
  
      tranport_email.sendMail(mailoptions, (err, info)=>{
          if(err) {
              return console.log(err);
          }
          console.log('email sent %s', info.messageId );
      });
    
    email_counter_start +=1;
  }
  send_DB(req, res);
}

function send_DB(req, res){
//router.post('/send_data', (req, res)=>{
    console.log(req.body);
  var sender_name = req.body.sender_name;  
  var sender_email = req.body.sender_email;
  var receiver_name = req.body.receiver_name;
  var receiver_email = req.body.receiver_email;

  var email_subject = req.body.email_subject;
  var  email_body   = req.body.email_body;
  
  var insert_qry = "insert into my_data values (default, '"+sender_name+"','"+sender_email+"' , '"+receiver_name+"','"+receiver_email+"' , '"+email_subject+"' , '"+email_body+"' , '')";
  var qry_result=mysqlconnection.query(insert_qry, function(err){
      if(err){
          throw err;
      }
      console.log(qry_result);
      console.log(insert_qry);
      res.redirect('/');
      
      //mysqlconnection.end();
      
  });
}

//app.use('/', router);


module.exports = router;
