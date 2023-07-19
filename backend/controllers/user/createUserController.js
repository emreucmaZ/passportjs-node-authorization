const sendResponse = require("../../helpers/sendResponse");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const logger = require("../../helpers/logger/logger");

const myLogger = logger();
function createUser(req, res) {
  const newUser = new User({
    password: req.body.password,
    username: req.body.username,
    roleId: req.body.roleId,
  });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, async function (err, hash) {
      if (err) {
        console.error("Parola şifreleme hatası:", err);
        return;
      }
      newUser.password = hash; // Şifrelenmiş parolayı kaydetme
      if (!newUser.roleId) {
        newUser.roleId = "64aeed9518153db10b51ad39";
      }
      newUser
        .save()
        .then((savedUser) => {
          myLogger.logCreatedEntity(req.user, "users", savedUser);
          return sendResponse(
            true,
            "message",
            "Yeni kullanıcı kaydedildi",
            res
          );
        })
        .catch((error) => {
          return sendResponse(
            false,
            "message",
            "Kullanıcı kaydetme hatası: " + error,
            res
          );
        });
    });
  });
}

module.exports = createUser;
