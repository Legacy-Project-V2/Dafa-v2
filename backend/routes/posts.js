const router = require('express').Router();
const verify = require('./verifyToken.js');

//whenever we make an http get request method to '/' to our server, then execute this function
router.get('/Homepage',verify, (req,res)=>{
    // router.get('/', (req,res)=>{
    // res.json({
    //     posts: {
    //     title: 'my first post',
    //     description: 'random data you shouldnt access without being logged in'
    //     }
    // });
    // res.send('Hello its working');
    res.send(req.user); 
    // User.findbyone({_id: req.user})
});


module.exports = router ;
