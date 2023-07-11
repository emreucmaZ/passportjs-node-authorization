const sendResponse = require("../../helpers/sendResponse");
const User = require("../../models/userModel");
const bcrypt = require('bcrypt');

function createUser(req,res){
    const newUser = new User(req.body);

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt,async function (err, hash) {
        if (err) {
          console.error("Parola şifreleme hatası:", err);
          return;
        }
        newUser.password = hash; // Şifrelenmiş parolayı kaydetme
        if(!newUser.roleId){
            newUser.roleId = "64abe22ce4261d5365ae72d1";
        }
            newUser
            .save()
            .then((savedUser) => {
              return sendResponse(true,"message","Yeni kullanıcı kaydedildi:" + savedUser,res)
            })
            .catch((error) => {
              return sendResponse(false,"message","Kullanıcı kaydetme hatası:" + error,res)
            });
        
      });
    });
}

module.exports = createUser;