const Image = require("../../models/imageModel");
const { DIR } = require("../../variables");
const fs = require("fs");
const logger = require("../../helpers/logger/logger");
const sendResponse = require("../../helpers/sendResponse");

const myLogger = logger();
function deleteImage(req, res) {
  if(req.user.roles.indexOf('superadmin' > -1)){
    Image.findById(req.params.imageId)
    .then((response) => {
      const imagePath = `${DIR}/${response.filename}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        Image.findByIdAndRemove(req.params.imageId).then((response) => {
          myLogger.logDeletedEntity(req.user, "images", response);
          sendResponse(true, "deletedImage", response, res, 204);
        });
      } else {
        res.status(404).json({ error: "Resim bulunamadı" });
      }
    })
    .catch((err) => res.send(err));
  }else{
    Image.findById(req.params.imageId)
    .then((response) => {
      if(response.creator._id.toString() == req.user._id.toString()){
        const imagePath = `${DIR}/${response.filename}`;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          Image.findByIdAndRemove(req.params.imageId).then((response) => {
            myLogger.logDeletedEntity(req.user, "images", response);
            sendResponse(true, "deletedImage", response, res, 204);
          });
        } else {
          res.status(404).json({ error: "Resim bulunamadı" });
        }
      }
    })
    .catch((err) => res.send(err));
  }
}

module.exports = deleteImage;
