const config = require('../config/config');
const imageMetaModel = require('../models/ImageMetaModel');

module.exports = function(fetchType){
    return new Promise((resolve, reject)=>{
        imageMetaModel.find({}, null, {sort: {date: -1}, limit: config.MAX_FETCH_LIMIT}, function(err, docs) {
            if(err) {console.log(err); reject([])}
    
            let filenames = []
            for(let file of docs){
                filenames.push(config.IP+"/"+file.filename)
            }
            resolve(filenames)
        });
    })
    
}