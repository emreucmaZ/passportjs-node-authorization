const sendResponse = require("../../helpers/sendResponse");
const getUserPermissionsFromDatabase = require("../../helpers/getUserPermissionsFromDatabase");

async function getUserPermissions(req,res){
    sendResponse(true,"permissions",await getUserPermissionsFromDatabase(req.user.roleId),res,200)
}

module.exports = getUserPermissions;