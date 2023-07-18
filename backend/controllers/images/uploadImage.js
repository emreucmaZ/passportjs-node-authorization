const { default: slugify } = require("slugify");
const Image = require("../../models/imageModel");
const { upload } = require("../../multerStorage");
const logger = require("../logger/logger");
const sendResponse = require("../../helpers/sendResponse");

const myLogger = logger();
function uploadImage(req, res) {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const newImage = new Image({
      title: req.body.title,
      filename: slugify(req.file.originalname, { lower: true }),
    });
    newImage
      .save()
      .then((response) => {
        myLogger.logCreateAction(req.user, "images", response);
        sendResponse(true,"image",{url:response.filename},res,200)
      })
      .catch((err) => sendResponse(false,"image",{url:err.keyValue.filename},res,200));
  });
}

module.exports = uploadImage;
