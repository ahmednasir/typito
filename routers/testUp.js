const express = require("express");
var router = express.Router();
var path = require("path");
var upload = require("express-fileupload");
var model = require("../models/ImageMetaModel");
var imageService = require("../services/imageService");
var controller = require('../controllers/UploadController').UploadController;


router.post("/", async function(request, response) {

    if (request.files) {
            controller(request).then(images=>{
                if(images && images.length >0){
                    model.collection.insertMany(images, function (err, docs) {
                        if(err){
                            console.log(err);
                            response.status(400).send(false);
                        }else {
                            let d = new Date();
                            d = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
                            let resp = {};
                            resp[d] = images;
                            console.log(resp);
                            response.status(200).send(resp);
                        }
                    })

                }else{
                    response.status(400).send(500);
                }
            }).catch(err=>{
                console.log(err);
                response.status(400).send(err);
            })
    }
});

module.exports = router;
