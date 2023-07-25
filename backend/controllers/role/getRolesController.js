const getUserPermissionsFromDatabase = require("../../helpers/getUserPermissionsFromDatabase");
const sendResponse = require("../../helpers/sendResponse");
const Role = require("../../models/roleModel");
const User = require("../../models/userModel");

function getRoles(req,res){
    Role.find({}).then(async(result) => {
        sendResponse(true, "roles", result, res, 200);
      });
}

module.exports = getRoles;