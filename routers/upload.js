const express = require("express");
var router = express.Router();
const multer = require("multer");
var config = require("../config/config");
var imageSize = require("image-size");
var model = require("../models/ImageMetaModel");
var calculationService = require("../services/calculationService");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    let date = new Date().getTime().toString();
    let fileName = date + file.originalname;
    let obj = new model({
      filename: fileName
    });
    obj.save(function(err, _) {
      if (err) cb(null, false);
      cb(null, fileName);
    });
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100
  },
  fileFilter: fileFilter
}).array("productImage", config.MAX_UPLOAD_LIMIT);

router.post("/", async function(req, res) {
    upload(req, res, function(err){
        if(err){
            res.status(500).send(err)
        }else{
            res.send("Upload success")
        }
    });
});

router.get("/", function(req, res) {
  res.render("upload");
});

module.exports = router;
