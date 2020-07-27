var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user)
    res.render('index', {title: 'Chatogram'})
  else
    res.redirect('/chat')
});

router.get('/getUser', function(req, res, next) {
  res.json(req.user)
});


module.exports = router;
