var mongoose = require("mongoose");

var imageMeta = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  filename: {
    file1: {
      type: String,
      require: true
    },
    file2: {
      type: String,
      require: true
    },
    file3: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    }
  }
});

module.exports = mongoose.model("ImageMetaData", imageMeta, "ImageMetaData");
