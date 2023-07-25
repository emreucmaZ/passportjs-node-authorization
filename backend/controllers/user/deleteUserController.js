const sendResponse = require("../../helpers/sendResponse");
const User = require("../../models/userModel");
const logger = require('../../helpers/logger/logger');

const myLogger = logger();
async function deleteUser(req, res) {
  if (req.user._id != req.params.userId) {
    User.findByIdAndDelete(req.params.userId)
      .then((response) => {
        myLogger.logDeletedEntity(req.user,"users",response)
        sendResponse(true, "message", "Kullanıcı Silindi", res, 204);
      })
      .catch((err) => {
        sendResponse(false, "message", "Kullanıcı Silinemedi", res, 401);
      });
  }
}

module.exports = deleteUser;
