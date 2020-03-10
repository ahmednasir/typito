var imageService = require("../services/imageService");

module.exports.UploadController = async function (request) {
    return new Promise((async (resolve, reject) => {
        try {
            let images = new Array();
            var arr;
            if (Array.isArray(request.files.filesfld)) {
                arr = request.files.filesfld;
            } else {
                arr = new Array(1);
                arr[0] = request.files.filesfld;
            }
            let result = await Promise.all(arr.map(file => {

                if (
                    file.mimetype.toLowerCase() === "image/jpeg" ||
                    file.mimetype.toLowerCase() === "image/jpg" ||
                    file.mimetype.toLowerCase() === "image/png"
                ) {
                    let date = new Date().getTime().toString();
                    let fileNames = {
                        file1: "uploads/" + date +"_"+ file.name,
                        file2: "uploads/240/" + date +"_"+ file.name,
                        file3: "uploads/720/" + date +"_"+ file.name,
                        name: file.name,
                        timestamp: new Date().toISOString()
                    };
                    images.push(fileNames);
                    return imageService.imageManip(file.data, fileNames).then(resp => {
                        if (!resp) {
                            setTimeout(function () {
                                response.status(400).json([]);
                            }, 1000);
                        } else {
                            return resp
                        }
                    }).catch(err => {
                        // if (err.toLowerCase() === 'imagesize') {
                            return false
                        // }
                    });
                }
            })).catch(err=>{
                console.log(err)
            });
            for(let i=0;i<result.length;i++){
                if(!result[i]){
                    images.splice(i,1)
                }
            }
            resolve(images)
        }catch(e){
            reject(e)
        }
    }))


}