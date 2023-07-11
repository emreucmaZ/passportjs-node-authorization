const getUserPermissionsFromDatabase = require("./getUserPermissionsFromDatabase");
const sendResponse = require("./sendResponse");

function authorize(role) {
  return async (req, res, next) => {
    // Oturumu açık olan kullanıcıyı kontrol edin
    if (req.isAuthenticated()) {
      // Kullanıcının rollerini alın
      const userRoles = await getUserPermissionsFromDatabase(req.user.roleId);
      // Kullanıcının yetkilerini kontrol edin
      const hasPermission = () => userRoles.includes(role);
      if (hasPermission()) {
        // Kullanıcının yetkisi varsa, talebi devam ettirin
        return next();
      } else {
        // Kullanıcının yetkisi yoksa, 403 Forbidden hatası döndürün
        return sendResponse(false,"message","Yetkiniz yok",res,403)

      }
    } else {
      // Oturumu açık olmayan kullanıcı ise, 401 Unauthorized hatası döndürün
      return sendResponse(false,"message","Yetkilendirme gerekiyor" ,res,401)

    }
  };
}

module.exports = authorize;
