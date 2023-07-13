const sendResponse = require("../../helpers/sendResponse");
const Role = require("../../models/roleModel");
const logger = require('../logger/logger');

const myLogger = logger();
function createRole(req,res){
    const newRole = new Role({
      name:req.body.name,
      permissions:req.body.permissions
    });
        newRole
          .save()
          .then((savedRole) => {
            myLogger.logCreateAction(req.user,"roles",savedRole)
            sendResponse(true,"message","Yeni Rol kaydedildi:" + savedRole,res)
          })
          .catch((error) => {
            return sendResponse(false,"message","Rol kaydetme hatası:" + error,res)
          });
}

module.exports = createRole;