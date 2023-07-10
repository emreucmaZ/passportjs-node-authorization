const User = require("../../models/userModel");
const bcrypt = require('bcrypt');

function signUp(req,res){
    const {username,password} = req.body;
    const newUser = new User({username,password});
    newUser.roleId = "64abe22ce4261d5365ae72d1";
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.error("Parola şifreleme hatası:", err);
          return;
        }
        newUser.password = hash; // Şifrelenmiş parolayı kaydetme
        newUser
          .save()
          .then((savedUser) => {
            return sendResponse(true,"message","Kullanıcı Oluşturuldu:" + savedUser,res)

          })
          .catch((error) => {
            return sendResponse(false,"message","Kullanıcı oluşturma hatası:" + error,res)
          });
      });
    });
}

module.exports = signUp;