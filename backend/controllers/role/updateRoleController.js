const sendResponse = require("../../helpers/sendResponse");
const Role = require("../../models/roleModel");
const bcrypt = require("bcrypt");
const logger = require('../../helpers/logger/logger');

const myLogger = logger();
function updateRole(req, res) {
  const { name,permissions } = req.body;
  const updatedRole = { name, permissions };

  Role.findById(req.params.roleId).then((role) => {
      Role.findByIdAndUpdate(req.params.roleId, {
        name: req.body.name,
        permissions:req.body.permissions
      }).then((response) => {
        myLogger.logUpdateAction(req.user,"roles",updatedRole,response)
        sendResponse(true, "oldRole", response, res, 200);
      }).catch((err)=>{
        sendResponse(false, "message", "Böyle Bir rol var", res, 200);

      });
    
  });
}

module.exports = updateRole;
