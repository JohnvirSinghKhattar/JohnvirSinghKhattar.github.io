var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transport = {
  service: 'gmail.com',
  auth: {
    user: "dev.timojo@gmail.com",
    pass: "Admin1234!$"
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});


router.post('/send', (req, res, next) => {
    var email = req.body.email
    var message = req.body.message
  
    var mail = {
      from: email,
      to: 'dev.timojo@gmail.com',  //Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: 'Nachricht von: '+email+': '+message
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

  module.exports = router;