var mongoose = require('mongoose');

var imageMeta = mongoose.Schema({
    timestamp: {
        type:       Date,
        default:    Date.now
    },
    filename :{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('ImageMetaData', imageMeta, 'ImageMetaData')