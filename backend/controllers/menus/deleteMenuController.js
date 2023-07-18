const sendResponse = require("../../helpers/sendResponse");
const Menu = require("../../models/menuModel");
const logger = require("../../helpers/logger/logger");

const myLogger = logger();
async function deleteMenu(req, res) {
  Menu.find({}).then(response=>{
    if(!response.some(menu=>menu.parentId == req.params.menuId)){
      Menu.findByIdAndDelete(req.params.menuId)
      .then((response) => {
        myLogger.logDeleteAction(req.user, "menus", response);
        sendResponse(true, "message", "Menü Silindi", res, 204);
      })
      .catch((err) => {
        sendResponse(false, "message", "Menü Silinemedi", res, 403);
      });
    }
  })
  
}

module.exports = deleteMenu;
