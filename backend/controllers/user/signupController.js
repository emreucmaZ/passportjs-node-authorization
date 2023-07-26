const sendResponse = require("../../helpers/sendResponse");
const User = require("../../models/userModel");
const bcrypt = require('bcrypt');
const logger = require('../../helpers/logger/logger')

const myLogger = logger();
function signUp(req,res){
    const {username,password} = req.body;
    const newUser = new User({username,password});
    newUser.roleId = "0";
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.error("Parola şifreleme hatası:", err);
          return;
        }
        newUser.password = hash; // Şifrelenmiş parolayı kaydetme
        newUser.creationDate = new Date()
        newUser.roleId = "0"
        newUser
          .save()
          .then((savedUser) => {
            myLogger.logEntityWithActionType(req.user, "users", savedUser,"signup");
            return sendResponse(true,"message","Kullanıcı Oluşturuldu:" + savedUser,res)
          })
          .catch((error) => {
            return sendResponse(false,"message","Kullanıcı oluşturma hatası:" + error,res)
          });
      });
    });
}

module.exports = signUp;