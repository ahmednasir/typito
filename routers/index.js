const express = require('express');
var router = express.Router()


router.get('/', function(req,res){
    res.render('index',{
        data: {
            Message: true
        }
    })
})

router.post('/', function(req, res){
    
    if(req.body.email === 'nasir@mail.com' && req.body.password === "123456"){
        res.redirect('/home')
    }else{
        res.render('index',{
            data: {
                Message: false
            }
        })
    }
    
})

module.exports = router