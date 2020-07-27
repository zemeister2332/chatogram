const express = require('express');
const router = express.Router();
const LoadingAnimation = require('loading-animation');
//libs
const Messages = require('../src/lib/Messages');

router.get('/list', (req, res, next) => {
 setTimeout(() => {
     Messages.list(req.query.roomId, messages => {
         // console.log(req.query);
         res.json(messages);
     });
 },500);
});
router.get('/anim',(req,res) => {

    let anim = new LoadingAnimation('Text before'); // animation starts automatically
    setTimeout(()=>{
        anim.stop('Ok');
    }, 3000);

    res.send('Hello');
});

module.exports = router;
