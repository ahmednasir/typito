const express = require('express');
var router = express.Router()
const multer = require('multer')
var config = require('../config/config');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        
        let fileName = file.originalname
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
}).array('productImage', config.MAX_UPLOAD_LIMIT);

router.post('/', function (req, res) {
    upload(req, res,function(err){
        if(err){
            console.log(err)
            return res.end("Error")
        } 
        res.end("uploaded")
    })
})

module.exports = router