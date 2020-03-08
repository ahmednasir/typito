const express = require("express");
var router = express.Router();
var path = require("path");
var upload = require("express-fileupload");
var model = require("../models/ImageMetaModel");
var imageService = require("../services/imageService");

router.get("/", function(req, res) {
  res.render("testUpload", {
    layout: false
  });
});

router.post("/", function(request, response) {
  var images = new Array();
  if (request.files) {
    var arr;
    if (Array.isArray(request.files.filesfld)) {
      arr = request.files.filesfld;
    } else {
      arr = new Array(1);
      arr[0] = request.files.filesfld;
    }
    for (var i = 0; i < arr.length; i++) {
      var file = arr[i];
      console.log(file);
      if (
        file.mimetype.toLowerCase() === "image/jpeg" ||
        file.mimetype.toLowerCase() === "image/jpg" ||
        file.mimetype.toLowerCase() === "image/png"
      ) {
        let date = new Date().getTime().toString();

        let fileNames = {
          file1: "uploads/" + date + file.name,
          file2: "uploads/240/" + date + file.name,
          file3: "uploads/720/" + date + file.name
        };

        images[i] = fileNames;
        imageService.imageManip(file.data, fileNames).then(resp => {
          if (!resp) {
            setTimeout(function() {
              response.status(400).json([]);
            }, 1000);
          } else {
            let obj = new model({
              filename: fileNames
            });
            obj.save(function(err, _) {
              if (err) {
                console.log(err);
                response.status(500).send({
                  Message: false
                });
              }
            });
          }
        });
      }
    }
    let d = new Date();
    d = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    let resp = {
      d : images
    }
    setTimeout(() => {
      console.log(resp)
      response.status(200).send(resp);
    }, 3000);
  }
});

module.exports = router;
