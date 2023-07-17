const { default: slugify } = require("slugify");
const Image = require("../../models/imageModel");
const { upload } = require("../../multerStorage");
const logger = require("../logger/logger");

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
      .then((res) => {
        myLogger.logCreateAction(req.user, "images", res);
      })
      .catch((err) => console.log(err));
    res.send("Upload");
  });
}

module.exports = uploadImage;
