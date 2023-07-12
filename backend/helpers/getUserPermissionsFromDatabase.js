const Role = require("../models/roleModel");

async function getUserPermissionsFromDatabase(roleId) {
  return (
    (await Role.findById(roleId).then((role) => role.permissions).catch(err=>[])) ||
    []
  );
}

module.exports = getUserPermissionsFromDatabase;
