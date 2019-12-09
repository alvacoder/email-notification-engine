var express = require('express');
var router = express.Router();
let dotenv = require('dotenv');
dotenv.config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:action', (req, res, next) => {
    let action = req.params.action;
    if(action === 'send') {
        
        const msg = {
        to: 'idrisadeniji01@gmail.com',
        from: 'noreply@email.com',
        subject: 'Hello world',
        text: 'hi',
        html: '<p>Hello HTML world!</p>',
        };

        sgMail.send(msg);
        
        if(res.statusCode === 200) {
            return res.json({
                Confirmation: 'Email successfully sent.'
            })
        } else {
            return res.json({
                failure: 'Unable to send mail'
            });
        }
        

        return next();
    }
})

module.exports = router;
