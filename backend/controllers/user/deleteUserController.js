const sendResponse = require("../../helpers/sendResponse");
const User = require("../../models/userModel");

async function deleteUser(req, res) {
  if (req.user._id != req.params.userId) {
    User.findByIdAndDelete(req.params.userId)
      .then((response) => {
        sendResponse(true, "message", "Kullanıcı Silindi", res, 204);
      })
      .catch((err) => {
        sendResponse(false, "message", "Kullanıcı Silinemedi", res, 401);
      });
  }
}

module.exports = deleteUser;
