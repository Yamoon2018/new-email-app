import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
//const send_email_SMTP = require('../server/routes/send_email_smtp');




class App extends Component{
    constructor(){
        super()
        this.state={
            sender_name: '',
            sender_email: '',
            receiver_name: '',
            receiver_email: '',
            email_subject: '',
            email_body: '',
            email_attachment: '',
            email_status:''
        }

        this.changeSenderName = this.changeSenderName.bind(this);
        this.changeSenderEmail = this.changeSenderEmail.bind(this);
        this.changeReceiverName = this.changeReceiverName.bind(this);
        this.changeReceiverEmail = this.changeReceiverEmail.bind(this);
        this.changeEmailSubject = this.changeEmailSubject.bind(this);
        this.changeEmailBody = this.changeEmailBody.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this) ;

    }

    changeSenderName(event){
        console.log(event.target.value);
        this.setState({
            sender_name: event.target.value
        }) 
    }

    changeSenderEmail(event){
        this.setState({
            sender_email: event.target.value
        }) 
    }

    changeReceiverName(event){
        this.setState({
            receiver_name: event.target.value
        }) 
    }

    changeReceiverEmail(event){
        this.setState({
            receiver_email: event.target.value
        }) 
    }

    changeEmailSubject(event){
        this.setState({
            email_subject: event.target.value
        }) 
    }

    changeEmailBody(event){
        this.setState({
            email_body: event.target.value
        }) 
    }

    handleSelectChange(event){
        this.setState({
            email_status: event.target.value
        }) 
    }

    onSubmit(event){
        event.preventDefault();
//console.log("sender_name ="+this.state.sender_name);
        const send_email_db={
            sender_name:    this.state.sender_name,
            sender_email:   this.state.sender_email,
            receiver_name:  this.state.receiver_name,
            receiver_email: this.state.receiver_email,
            email_subject:  this.state.email_subject,
            email_body:     this.state.email_body,
            //email_attachment: '',
            //email_status:   this.state.email_status

        }

        axios.post('http://localhost:4001/app/save_db', send_email_db)
        .then(res => {
            console.log("res data ==");
            console.log(res.data);

        })
        .catch(err => {
            console.log(err);
        });

    }

    render(){
        return (
            <div>
                <div>
                    <p><b><h3>Yamin's Email App</h3></b></p>
                </div>
                <div className="container">
                    <div className="form-div">
                    <form onSubmit={this.onSubmit}>
          Sender's Name
          <input value={this.state.sender_name} className="form-control form-group" onChange={this.changeSenderName} placeholder="Sender's name..." type="text" name="sender_name" /> 
          <p></p>
          Sender's Email
          <input value={this.state.sender_email} className="form-control form-group" onChange={this.changeSenderEmail} placeholder="Sender's email..." type="text" name="sender_email"  />
          <p></p>
          Receiever's Name<input value={this.state.receiver_name} className="form-control form-group"  onChange={this.changeReceiverName} placeholder="Receiver's name..." type="text" name="receiver_name" /> 
          <p></p>
          Receiever's Email(s)<input value={this.state.receiver_email} className="form-control form-group" onChange={this.changeReceiverEmail} placeholder="Receiver's Email.." type="text" name="receiver_email" />
          <p></p>
          Subject <input value={this.state.email_subject} className="form-control form-group" onChange={this.changeEmailSubject} placeholder="Subject..." type="text" name="email_subject" /> 
          <p></p>
          Message          
          <textarea value={this.state.email_body} className="form-control form-group" onChange={this.changeEmailBody} name="email_body" />
          <p></p>
          Email Status
          <select onChange={this.handleSelectChange} name="select_email_status" value={this.state.email_status} >          
          <option value="all">Send one email to all receievers</option>
          <option value="each">Send one email to each receiever</option>          
        </select>
          <p></p>
          
          <button type="submit" className="btn btn-danger btn-block" value ="btn_sendEmail">Send Email</button>
          
          </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;