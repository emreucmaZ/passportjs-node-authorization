const sendResponse = require("../../helpers/sendResponse");
const logger = require('../../helpers/logger/logger');
const SocialConnection = require("../../models/socialConnectionModel");

const myLogger = logger();
async function deleteSocialConnection(req, res) {
    SocialConnection.findByIdAndDelete(req.params.socialConnectionId)
      .then((response) => {
        myLogger.logDeletedEntity(req.user,"socialConnections",response)
        sendResponse(true, "message", "Sosyal Bağlantı Silindi", res, 204);
      })
      .catch((err) => {
        sendResponse(false, "message", "Sosyal Bağlantı Silinemedi", res, 401);
      });
}

module.exports = deleteSocialConnection;
