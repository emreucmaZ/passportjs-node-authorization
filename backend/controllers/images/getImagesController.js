const getUserPermissionsFromDatabase = require("../../helpers/getUserPermissionsFromDatabase");
const sendResponse = require("../../helpers/sendResponse");
const Image = require("../../models/imageModel");

function getImages(req, res) {
  Image.find({}).then(async (result) => {
    sendResponse(true, "images", result ||[], res, 200);
  });
}

module.exports = getImages;
