const sendResponse = require("../../helpers/sendResponse");
const Role = require("../../models/roleModel");

function createRole(req,res){
    const newRole = new Role(req.body);
        newRole
          .save()
          .then((savedRole) => {
            sendResponse(true,"message","Yeni Rol kaydedildi:" + savedRole,res)
          })
          .catch((error) => {
            return sendResponse(false,"message","Rol kaydetme hatası:" + error,res)
          });
}

module.exports = createRole;