const getUserPermissionsFromDatabase = require("../../helpers/getUserPermissionsFromDatabase");
const sendResponse = require("../../helpers/sendResponse");
const User = require("../../models/userModel");

function getUsers(req,res){
    User.find({}).then(async(result) => {
        for (const user of result) {
            user.roles = await getUserPermissionsFromDatabase(user.roleId);
          }
        sendResponse(true, "kullanicilar", result, res, 200);
      });
}

module.exports = getUsers;