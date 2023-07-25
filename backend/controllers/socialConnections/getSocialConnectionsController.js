const sendResponse = require("../../helpers/sendResponse");
const SocialConnection = require("../../models/socialConnectionModel");

function getSocialConnections(req,res){
    SocialConnection.find({}).then(async(result) => {
        sendResponse(true, "socialConnections", result, res, 200);
      });
}

module.exports = getSocialConnections;