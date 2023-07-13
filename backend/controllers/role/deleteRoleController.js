const sendResponse = require("../../helpers/sendResponse");
const Role = require("../../models/roleModel");

async function deleteRole(req, res) {
  if (req.user.roleId != req.params.roleId) {
    Role.findByIdAndDelete(req.params.roleId)
      .then((response) => {
        sendResponse(true, "message", "Rol Silindi", res, 204);
      })
      .catch((err) => {
        sendResponse(false, "message", "Rol Silinemedi", res, 403);
      });
  }
}

module.exports = deleteRole;
