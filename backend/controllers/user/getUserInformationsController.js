const sendResponse = require("../../helpers/sendResponse");
const User = require("../../models/userModel");

function getUserInformations(req,res){
    User.findById(req.params.userId).then(response=>{
        console.log(response);
        sendResponse(true,"user",response,res,200)
    }).catch(err=>{
        res.send(err);
    })
}

module.exports = getUserInformations;