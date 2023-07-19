const sendResponse = require("../../helpers/sendResponse");
const Menu = require("../../models/menuModel");
const logger = require('../../helpers/logger/logger');

const myLogger = logger();
function updateMenu(req, res) {
  const { title,content,route,parentId } = req.body;
  const updatedMenu = { title,content,route,parentId };

  Menu.findById(req.params.menuId).then((menu) => {
      Menu.findByIdAndUpdate(req.params.menuId, {
        title: req.body.title,
        content:req.body.content,
        route: req.body.route,
        parentId:req.body.parentId,
      }).then((response) => {
        myLogger.logUpdatedEntity(req.user,"menus",updatedMenu,response)
        sendResponse(true, "oldMenu", response, res, 200);
      }).catch((err)=>{
        sendResponse(false, "message", "Böyle Bir Menu var", res, 200);
      });
  });
}

module.exports = updateMenu;
