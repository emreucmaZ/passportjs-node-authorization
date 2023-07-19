const sendResponse = require("../../helpers/sendResponse");
const Role = require("../../models/roleModel");
const logger = require('../../helpers/logger/logger');

const myLogger = logger();
async function deleteRole(req, res) {
  if (req.user.roleId != req.params.roleId) {
    Role.findByIdAndDelete(req.params.roleId)
      .then((response) => {
        myLogger.logDeletedEntity(req.user,"roles",response)
        sendResponse(true, "message", "Rol Silindi", res, 204);
      })
      .catch((err) => {
        sendResponse(false, "message", "Rol Silinemedi", res, 403);
      });
  }
}

module.exports = deleteRole;
