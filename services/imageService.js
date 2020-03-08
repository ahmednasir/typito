var jimp = require("jimp");
var imageSize = require("image-size");

module.exports.imageManip = (image, filename) => {
  return new Promise((resolve, reject) => {
    let dimensions = imageSize.imageSize(image);
    let minDimension = Math.min(dimensions.height, dimensions.width);
    if (minDimension < 500) {
      reject(false)
    }
    let resizeFactor1 = 240 / minDimension;
    let resizeFactor2 = 720 / minDimension;
    jimp
      .read(image)
      .then(resp => {
        resp.write(filename.file1);
        resp.scale(resizeFactor2).write(filename.file3);
        resp.scale(resizeFactor1).write(filename.file2)
        resolve(true);
      })
      .catch(err => {
        console.log(err);
        reject(false)
      });
  });
};
