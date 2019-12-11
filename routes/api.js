var express = require('express');
var router = express.Router();
let dotenv = require('dotenv');
const extract = require('mention-hashtag');
dotenv.config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/quill', (req, res) => {

    res.render('quill.hbs');
});

router.post('/:action', (req, res, next) => {
    let action = req.params.action;

        if(action === 'send') {

        const unsterilizedMsg = req.body.content;

        let mentions = extract(unsterilizedMsg, { unique: false, symbol: false});

        let mentionsQuery = 'select email, ';

        let mentionsString = mentions.join();

/*         mentions.forEach(mention => {
            mentionsQuery.append(', ' + mention);
        }); */

        console.log(mentions);
        console.log(mentionsString);
        console.log(mentionsQuery);

        let recipients = (req.body.recipients).split(',');
        const msg = {
        to: recipients,
        from: 'noreply@atbtechsoft.com',
        subject: req.body.subject,
        text: 'hi',
        html: req.body.content,
        };

        //console.log(req.body.content);

        sgMail.sendMultiple(msg);
        
        if(res.statusCode === 200) {
            return res.json({
                Confirmation: 'Email successfully sent.',
                dtype: typeof(req)
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
