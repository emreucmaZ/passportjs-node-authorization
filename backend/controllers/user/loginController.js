const jwt = require("jsonwebtoken");
const getSecretKey = require("../../helpers/getSecretKey");
const User = require("../../models/userModel");
const getUserRolesFromDatabase = require("../../helpers/getUserRolesFromDatabase");
const createToken = require("../../helpers/createToken");
const sendResponse = require("../../helpers/sendResponse");

async function loginController(req, res) {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı veritabanından bulun
    const user = await User.findOne({ username });
    if (!user) {
      return sendResponse(false,"message","Geçersiz kullanıcı adı",res,401)
    }

    // Parolayı doğrula
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return sendResponse(false,"message","Geçersiz Parola",res,401)
    }
    // JWT oluştur
    if(user.roleId != 0){
      user.roles = await getUserRolesFromDatabase(user.roleId);
    }
    // Kullanıcı bilgileri ve token'i dön
    return sendResponse(true,"response",{user:user,token:createToken(user, jwt, getSecretKey)},res,200)
  } catch (err) {
    console.error(err);
    return sendResponse(false,"message","Sunucu hatası",res,500)
  }
}

module.exports = loginController;
