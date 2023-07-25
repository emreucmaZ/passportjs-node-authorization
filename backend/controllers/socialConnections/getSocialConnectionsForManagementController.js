const sendResponse = require("../../helpers/sendResponse");
const SocialConnection = require("../../models/socialConnectionModel");

function getSocialConnectionsForManagement(req,res){
    if(req.user.roles.indexOf('superadmin')>-1){
      SocialConnection.find({}).then(async(result) => {
        sendResponse(true, "socialConnections", result, res, 200);
      });
    }else{
      SocialConnection.find({}).then(async(result) => {
        sendResponse(true, "socialConnections", result.filter(socialConnection => socialConnection.creator._id == req.user._id.toString()), res, 200);
      });
    }
}

module.exports = getSocialConnectionsForManagement;