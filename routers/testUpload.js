const express = require('express');
var router = express.Router()
var path = require('path');
var upload = require('express-fileupload');



router.get('/', function(req,res){
    res.render('testUpload',{
        layout: false
    });
})

router.post('/', function(request, response){
    var images = new Array();
    if(request.files) {
        var arr;
        if(Array.isArray(request.files.filesfld)) {
            arr = request.files.filesfld;
        }
        else {
            arr = new Array(1);
            arr[0] = request.files.filesfld;
        }
        for(var i = 0; i < arr.length; i++) {
            var file = arr[i];
            if(file.mimetype.substring(0,5).toLowerCase() == "image") {
                images[i] = "/" + file.name;
                file.mv("upload" + images[i], function (err) {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        }
    }
    // give the server a second to write the files
    setTimeout(function(){response.json(images);}, 1000);
})

module.exports = router