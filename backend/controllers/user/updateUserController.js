const sendResponse = require("../../helpers/sendResponse");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

function updateUser(req, res) {
  const { username, password, roleId } = req.body;
  const updatedUser = { username, password, roleId };

  User.findById(req.params.userId).then((user) => {
    if (updatedUser.password == "" && updateUser.password == null) {
      User.findByIdAndUpdate(req.params.userId, {
        username: req.body.username,
        roleId:
          req.user?.roles?.indexOf("get_roles") > -1
            ? req.body.roleId
            : user.roleId,
      }).then((response) => {
        sendResponse(true, "oldUser", response, res, 200);
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(updatedUser.password, salt, async function (err, hash) {
          if (err) {
            console.error("Parola şifreleme hatası:", err);
            return;
          }
          User.findByIdAndUpdate(req.params.userId, {
            username: req.body.username,
            password: hash,
            roleId: req.body.roleId,
          }).then((response) => {
            sendResponse(true, "updatedUser", response, res, 200);
          });
        });
      });
    }
  });
}

module.exports = updateUser;
