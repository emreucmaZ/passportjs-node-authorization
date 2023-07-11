const getUserPermissionsFromDatabase = require("./getUserPermissionsFromDatabase");
const sendResponse = require("./sendResponse");

async function controlPermission(req,res,roleName,controller){
    req.user.roles = await getUserPermissionsFromDatabase(req.user.roleId);
    if (req.user.roles.includes(roleName)) {
      controller(req, res);
    } else {
      return sendResponse(false,"message","Yetkilendirme hatası. Gerekli yetkiye sahip değilsiniz." ,res,403)

    }
}

module.exports = controlPermission;