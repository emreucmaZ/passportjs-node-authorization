const sendResponse = require("../../helpers/sendResponse");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const logger = require("../../helpers/logger/logger");

const myLogger = logger();
function updateUser(req, res) {
  const { username, password, roleId } = req.body;
  const updatedUser = { username, password, roleId };

  User.findById(req.params.userId).then((user) => {
    if (updatedUser.password == "" && updateUser.password == null) {
      User.findByIdAndUpdate(req.params.userId, {
        username: req.body.username,
        roleId: req.body.roleId,
        password:user.password
      }).then((response) => {
        updatedUser.password = user.password
        myLogger.logUpdateAction(req.user, "users", updatedUser, response);
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
            updatedUser.password = hash;
            myLogger.logUpdateAction(req.user, "users", updatedUser, response);
            sendResponse(true, "oldUser", response, res, 200);
          });
        });
      });
    }
  });
}

module.exports = updateUser;
