const config = require("../config/config");
const imageMetaModel = require("../models/ImageMetaModel");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

module.exports = function(fetchType, body) {
  return new Promise((resolve, reject) => {
    if (fetchType.toLowerCase() === "first") {
      imageMetaModel.countDocuments({}, (err, count) => {
        if (err) {
          console.log(err);
          reject({});
        } else {
          imageMetaModel.find(
            {},
            null,
            { sort: { date: "descending" }, limit: config.MAX_FETCH_LIMIT },
            function(err, docs) {
              if (err) {
                console.log(err);
                reject({});
              }
              if (docs.length == 0) {
                resolve({});
              } else {
                let dateDict = formatData(docs, true);

                myCache.set("LastDate", docs[docs.length - 1]._doc.date);
                resolve([dateDict, count]);
              }
            }
          );
        }
      });
    } else if (fetchType.toLowerCase() === "existing") {
      imageMetaModel.countDocuments({}, (err, count) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          
          if(parseInt(body.TotalDocs) < count){
          let lastDate = new Date(body.LastDate);
          imageMetaModel
            .aggregate([
              {
                $match: {
                  date: {
                    $lt: lastDate
                  }
                }
                // $limit: config.MAX_FETCH_LIMIT
              }
            ])
            .sort({ date: "descending" })
            .exec((err, docs) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                
                if (docs.length == 0) {
                  resolve({});
                } else {
                  let dateDict = formatData(docs, false);
                  myCache.set("LastDate", docs[docs.length - 1].date);
                  resolve([dateDict, count]);
                }
              }
            });
          }else{
            resolve({})
          }
        }
      });
    }
  });
};

function formatData(docs, parseFlag) {
  let dateDict = {};

  let filenames = [];
  

  for (let file of docs) {
    let d = new Date(file.timestamp);
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    d =
      d.getDate() +
      "-" +
      month +
      "-" +
      d
        .getFullYear()
        .toString()
        .slice(2, 4);
    let obj = {};
    if (parseFlag) {
      obj = {
        file1: config.IP + "/" + file._doc.file1.replace("uploads/", ""),
        file2: config.IP + "/" + file._doc.file2.replace("uploads/", ""),
        file3: config.IP + "/" + file._doc.file3.replace("uploads/", ""),
        timestamp: file._doc.timestamp,
        name: file._doc.name,
        date: file._doc.date
      };
    } else {
      obj = {
        file1: config.IP + "/" + file.file1.replace("uploads/", ""),
        file2: config.IP + "/" + file.file2.replace("uploads/", ""),
        file3: config.IP + "/" + file.file3.replace("uploads/", ""),
        timestamp: file.timestamp,
        name: file.name,
        date: file.date
      };
    }
    if (d in dateDict) {
      dateDict[d].push(obj);
    } else {
      dateDict[d] = [obj];
    }
    filenames.push(obj);
  }
  return dateDict;
}
