var nodemail = require('nodemailer');

function send_email_db(req){
    console.log("req=="+ JSON.stringify(req.body));
    //break;
    var receiver_emails='';
    var sender_email='';
    var date = new Date();
      if(req){
        
          sender_email = JSON.stringify(req.body.sender_email);
        receiver_emails = JSON.stringify(req.body.receiver_email).split(',');
          
        var email_status   =  req.body.email_status;
        var email_subject = req.body.email_subject;
        var email_body = req.body.email_body;
        console.log("convert=="+receiver_emails.length); 
        
  
    }
  
  
    const email_output = `
        
        <h3>Your emails sent ${email_subject}</h3>
        <ul>
            <li> Email ${email_body}</li>
        </ul>
    `;
  
    let tranport_email = nodemail.createTransport({
      port: 587,
      address: 'smtp.mailgun.org',    
      host: 'https://heroku-email-app.herokuapp.com',
        auth: {
            user: 'postmaster@sandbox9ec8e5daaec146fca37a45479baea5f2.mailgun.org' ,
            pass: '98e50b79f92e630a413bc3d8a7716c02-2af183ba-fa201257',
        }
    });
    
    var email_counter_start =0;
    var receiver_email_list =0;
  
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
    //send_DB(req, res);
  }