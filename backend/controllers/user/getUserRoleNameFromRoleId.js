const sendResponse = require("../../helpers/sendResponse");
const Role = require("../../models/roleModel");

function getUserRoleNameFromRoleId(req,res){
    Role.findById(req.user.roleId).then((response)=>{
        console.log(response);
        sendResponse(true,"roleName",response.name,res,200)
    }).catch((err)=>{
        sendResponse(true,"roleName","Rol Yok",res,200)
    })
}

module.exports = getUserRoleNameFromRoleId;