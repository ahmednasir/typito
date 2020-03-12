const config = require("../config/config");
const imageMetaModel = require("../models/ImageMetaModel");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

module.exports = function(fetchType) {
  return new Promise((resolve, reject) => {
    if (fetchType.toLowerCase() === "first") {
      imageMetaModel.find(
        {},
        null,
        { sort: { date: "descending" }, limit: config.MAX_FETCH_LIMIT },
        function(err, docs) {
          if (err) {
            console.log(err);
            reject([]);
          }
          let dateDict = formatData(docs);
          
          myCache.set("LastDate", docs[docs.length-1]._doc.date);
          resolve(dateDict);
        }
      );
    } else if (fetchType.toLowerCase() === "existing") {
      let lastDate = myCache.get("LastDate");
      imageMetaModel.find(
        { date: { $lt: lastDate } },
        null,
        { sort: { date: "descending" }, limit: config.MAX_FETCH_LIMIT },
        function(err, docs) {
          if (err) {
            console.log(err);
            reject(err);
          }
          if (docs.length == 0) {
            resolve({});
          } else {
            let dateDict = formatData(docs);
            resolve(dateDict);
          }
        }
      );
    }
  });
};

function formatData(docs) {
  let dateDict = {};

  let filenames = [];
  console.log(docs.length);
  console.log(docs[0]._doc.timestamp);
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
    let obj = {
      file1: config.IP + "/" + file._doc.file1.replace("uploads/", ""),
      file2: config.IP + "/" + file._doc.file2.replace("uploads/", ""),
      file3: config.IP + "/" + file._doc.file3.replace("uploads/", ""),
      timestamp: file._doc.timestamp,
      name: file._doc.name
    };
    if (d in dateDict) {
      dateDict[d].push(obj);
    } else {
      dateDict[d] = [obj];
    }
    filenames.push(obj);
  }
  return dateDict;
}
