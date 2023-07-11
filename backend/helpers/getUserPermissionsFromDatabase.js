const Role = require("../models/roleModel");

async function getUserPermissionsFromDatabase(roleId) {
  // Burada gerçek bir veritabanı bağlantısı veya veri kaynağına sorgu yapmanız gerekebilir
  // Kullanıcının rollerini veritabanından alarak döndürün

  // Örnek olarak, sabit bir kullanıcı rolü listesi döndürüyoruz
  // Bu listeyi gerçek veritabanı sorgusuyla değiştirmeniz gerekecektir
  if(roleId != 0){
    return (await Role.findById(roleId).then((role) => role.permissions)) || [];
    
  }
}

module.exports = getUserPermissionsFromDatabase;
