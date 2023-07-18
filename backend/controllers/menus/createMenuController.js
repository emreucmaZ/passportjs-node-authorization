const sendResponse = require("../../helpers/sendResponse");
const logger = require("../../helpers/logger/logger");
const Menu = require("../../models/menuModel");
const { default: slugify } = require("slugify");

const myLogger = logger();
function createMenu(req, res) {
  const newMenu = new Menu({
    title: req.body.title,
    content: req.body.content,
    parentId: req.body.parentId || "0",
    route:req.body.route || slugify(req.body.title,{lower:true})
  });
      newMenu
        .save()
        .then((savedMenu) => {
          myLogger.logCreateAction(req.user, "menus", savedMenu);
          return sendResponse(
            true,
            "message",
            "Yeni Menü kaydedildi",
            res
          );
        })
        .catch((error) => {
          return sendResponse(
            false,
            "message",
            "Menü kaydetme hatası: " + error,
            res
          );
        });
}

module.exports = createMenu;
