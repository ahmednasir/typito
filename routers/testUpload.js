const express = require('express');
var router = express.Router()


router.get('/', function(req,res){
    res.render('testUpload');
})

module.exports = router