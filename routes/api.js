var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:action', (req, res, next) => {
    let action = req.params.action;
    if(action === 'send') {
        res.json({
            confirmation: 'Success',
            action: action
        })

        return
    } else {
        res.json({
            confirmation: 'failed',
            action: action
        })
    }
})
module.exports = router;
