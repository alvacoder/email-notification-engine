var express = require('express');
var router = express.Router();
let dotenv = require('dotenv');
let fs = require('fs');
const extract = require('mention-hashtag');
dotenv.config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:action', (req, res, next) => {
    let action = req.params.action;

        if(action === 'send') {

            sgMail.sendMultiple(req.body)
            .then((data) => {
                console.log(data);
                res.json({
                    Confirmation: 'Email successfully sent',
                    data
                })
            }).catch((error) => {
                res.json({
                    Failure: error
                })
            });
        
    }
})

module.exports = router;
