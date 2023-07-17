const sendResponse = require("../../helpers/sendResponse")
const Menu = require("../../models/menuModel")

function getMenus(req,res){
    Menu.find({}).then(response=>{
        sendResponse(true,"menus",response,res,200)
    }).catch(err=>{
        sendResponse(false,"message",response,res,404)
    })
}

module.exports = getMenus