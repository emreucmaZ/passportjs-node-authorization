const sendResponse = require("../../helpers/sendResponse");
const logger = require("../../helpers/logger/logger");
const SocialConnection = require("../../models/socialConnectionModel");

const myLogger = logger();
function updateSocialConnection(req, res) {
  const { connectionTitle, connectionUrl, connectionImageUrl } = req.body;
  const updatedSocialConnection = { connectionTitle, connectionUrl, connectionImageUrl };

  if(req.user.roles.indexOf('superadmin')>-1){
    SocialConnection.findById(req.params.socialConnectionId).then(
      (socialConnection) => {
        SocialConnection.findByIdAndUpdate(req.params.socialConnectionId, {
          connectionTitle: req.body.connectionTitle,
          connectionUrl: req.body.connectionUrl,
          connectionImageUrl: req.body.connectionImageUrl,
        })
          .then((response) => {
            myLogger.logUpdatedEntity(req.user, "socialConnections", updatedSocialConnection, response);
            sendResponse(true, "oldSocialConnection", response, res, 200);
          })
          .catch((err) => sendResponse(false, "message", err, res, 200));
      }
    );
  }else{
    SocialConnection.findById(req.params.socialConnectionId).then(
      (socialConnection) => {
       if(socialConnection.creator._id == req.user._id.toString()){
        SocialConnection.findByIdAndUpdate(req.params.socialConnectionId, {
          connectionTitle: req.body.connectionTitle,
          connectionUrl: req.body.connectionUrl,
          connectionImageUrl: req.body.connectionImageUrl,
        })
          .then((response) => {
            myLogger.logUpdatedEntity(req.user, "socialConnections", updatedSocialConnection, response);
            sendResponse(true, "oldSocialConnection", response, res, 200);
          })
          .catch((err) => sendResponse(false, "message", err, res, 200));
       }
      }
    );
  }
}

module.exports = updateSocialConnection;
