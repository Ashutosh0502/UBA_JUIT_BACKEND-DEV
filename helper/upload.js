import multer from 'multer';
import fs from 'fs';
import path from "path";

let count = 0;
let filesStorgePath = [];

/**
 * sets storage path for all the files that is upload. 
 */
const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    let storagePath = filesStorgePath[count] ? filesStorgePath[count++] : process.env.imageStoragePath;
    callback(null, storagePath);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const baseName = path.parse(file.originalname).name;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    minute = minute < 10 ? '0' + minute : minute;
    const updatedFile = `${baseName}_${date}_${month}_${year}_${hour}_${minute}_${ampm}${extension}`;
    file.originalname = updatedFile;
    callback(null, updatedFile);
  }
});

const upload = multer({ storage: storage }).array('uploader', process.env.maxUpload);

const uploadFile = {};

/*
 * saves the image files
 */
uploadFile.saveImage = (req, res, next) => {
  count = 0;
  upload(req, res, (err) => {
    if (err) return Promise.reject(err);
    next();
  });
}

/*
*deleteFile() is for delete the files.
*/
uploadFile.deleteFile = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.body.imageNames) {
        for (let index = 0; index < req.body.imageNames.length; index++) {
          const element = req.body.imageNames[index];
          await deleteSingleFile(element);
        }
      } else if (req.params.imageName) {
        await deleteSingleFile(req.params.imageName);
      }
      next();
    } catch (error) {
      reject(error)
    }


  });

}

/*
 * for deleting the single file.
 */
const deleteSingleFile = (imageName) => {
  fs.stat(path.resolve(`${process.env.imageStoragePath}/${imageName}`), (err, stats) => {
    if (err) {
      reject(err);
    }
    fs.unlink(path.resolve(`${process.env.imageStoragePath}/${imageName}`), (err) => {
      if (err) reject(err);
    });
  });
}

/*
 * it sets the path of the files.
 */
uploadFile.setFilesStoragePath = (pathArray) => {
  filesStorgePath = pathArray;
}
export default uploadFile;