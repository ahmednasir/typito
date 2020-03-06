const express = require('express');
var router = express.Router()

// controller
var imageController = require('../controllers/GetImageController');

router.get('/',function(req, res){
//    imageController("first").then(result=>{
//        res.render('home',
//        {
//            data: {
//                Images: result
//            }
//        })
//    }).catch(err=>{
//        res.send(err)
//    })
res.render('home')
})

module.exports = router;
