const sendResponse = require("../../helpers/sendResponse");
const logger = require("../../helpers/logger/logger");
const SocialConnection = require("../../models/socialConnectionModel");

const myLogger = logger();
async function updateSocialConnectionDeletion(req, res) {
  if (req.user.roles.indexOf("superadmin") > -1) {
    SocialConnection.findByIdAndUpdate(req.params.socialConnectionId,{
      isDeleted:req.body.isDeleted
    })
      .then((response) => {
        if(req.body.isDeleted){
          myLogger.logDeletedEntity(req.user, "socialConnections", response);
        }else{
          myLogger.logEntityWithActionType(req.user, "socialConnections", response,"undo_deletion");
        }
        sendResponse(true, "message", "Sosyal Bağlantı Silindi", res, 204);
      })
      .catch((err) => {
        sendResponse(false, "message", "Sosyal Bağlantı Silinemedi", res, 401);
      });
  } else {
    SocialConnection.findById(req.params.socialConnectionId).then((socialConnection) => {
      if(socialConnection.creatorId == req.user._id.toString()){
        SocialConnection.findByIdAndUpdate(req.params.socialConnectionId,{
          isDeleted:req.body.isDeleted
        })
          .then((response) => {
            if(req.body.isDeleted){
              myLogger.logDeletedEntity(req.user, "socialConnections", response);
            }else{
              myLogger.logEntityWithActionType(req.user, "socialConnections", response,"undo_deletion");
            }
            sendResponse(true, "message", "Sosyal Bağlantı Silindi", res, 204);
          })
          .catch((err) => {
            sendResponse(false, "message", "Sosyal Bağlantı Silinemedi", res, 401);
          });
      }else{
        res.status(403)
      }
    })
  }
}

module.exports = updateSocialConnectionDeletion;
