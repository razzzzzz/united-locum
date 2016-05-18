'use strict';

var express = require('express');
var controller = require('./profile.controller');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });



var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://lokeshravitejav@gmail.com:lokeshseptember1993@smtp.gmail.com');

// setup e-mail data with unicode symbols

router.get('/simple',function(req,res){
  console.log('https://www.google.com/settings/security/lesssecureapps');
});

router.post('/sendmail', upload.single('file'),function(req,res){
console.log('rrrrrrrrrrrrrrrrr',req.body,req);
  var mailOptions = {
    from: '"lokeshravitejav@gmail.com" <lokeshravitejav@gmail.com>', // sender address
    to:  req.body.mailusername, // list of receivers
    subject: 'Unite Locum ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>testing mail sending ........Unite Locum 🐴</b>',
    attachments: [{
      filename: req.file.originalname,
      path: req.file.path
    }]// html body
  };

// send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
      res.status(200).send(info.response);
  });

});
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
