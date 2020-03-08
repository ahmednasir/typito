const config = require('../config/config');
const imageMetaModel = require('../models/ImageMetaModel');

module.exports = function(fetchType){
    return new Promise((resolve, reject)=>{
        imageMetaModel.find({}, null, {sort: {date: 1}, limit: config.MAX_FETCH_LIMIT}, function(err, docs) {
            if(err) {console.log(err); reject([])}
            let dateDict = {}
            
            let filenames = []

            for(let file of docs){
                let d = new Date(file.timestamp)
                d = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
                let obj = {
                    file1: config.IP+"/"+file.filename.file1.replace('uploads/',''),
                    file2: config.IP+"/"+file.filename.file2.replace('uploads/',''),
                    file3: config.IP+"/"+file.filename.file3.replace('uploads/',''),
                }
                if(d in dateDict){
                    dateDict[d].push(obj)
                }
                else{
                    dateDict[d] = [obj]
                }
                filenames.push(obj)
            }
            resolve(dateDict)
        });
    })
    
}
