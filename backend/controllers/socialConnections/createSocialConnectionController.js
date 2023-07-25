const sendResponse = require("../../helpers/sendResponse");
const logger = require("../../helpers/logger/logger");
const SocialConnection = require("../../models/socialConnectionModel");

const myLogger = logger();
function createSocialConnection(req, res) {
  const newSocialConnection = new SocialConnection({
    connectionTitle:req.body.connectionTitle,
    connectionUrl: req.body.connectionUrl,
    connectionImageUrl: req.body.connectionImageUrl,
    creationDate:new Date(),
    creator:req.user,
    isDeleted:false
  });
      newSocialConnection
        .save()
        .then((savedSocialConnection) => {
          myLogger.logCreatedEntity(req.user, "socialConnections", savedSocialConnection);
          return sendResponse(
            true,
            "message",
            "Yeni Sosyal Bağlantı kaydedildi",
            res
          );
        })
        .catch((error) => {
          return sendResponse(
            false,
            "message",
            "Sosyal Bağlantı kaydetme hatası: " + error,
            res
          );
        });
}

module.exports = createSocialConnection;
