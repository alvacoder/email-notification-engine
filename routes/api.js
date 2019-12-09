var express = require('express');
var router = express.Router();
let dotenv = require('dotenv');
dotenv.config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:action', (req, res, next) => {
    let action = req.params.action;

        if(action === 'send') {
        let recipients = (req.body.recipients).split(',');
        const msg = {
        to: recipients,
        from: 'noreply@atbtechsoft.com',
        subject: req.body.subject,
        text: 'hi',
        html: req.body.content,
        };

        sgMail.sendMultiple(msg);
        
        if(res.statusCode === 200) {
            return res.json({
                Confirmation: 'Email successfully sent.'
            })
        } else {
            return res.json({
                failure: 'Unable to send mail'
            });
        }
        

        return  next();
    }
})

module.exports = router;
