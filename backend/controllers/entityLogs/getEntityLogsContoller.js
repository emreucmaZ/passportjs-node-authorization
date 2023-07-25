const sendResponse = require("../../helpers/sendResponse");
const EntityLog = require("../../models/entityLogModel");

async function getEntityLogs(req,res){
    EntityLog.find({}).then((response)=>{
        sendResponse(ture,"entityLogs",response,res,200)
    }).catch((err)=>{
        res.send(err)
    })
}

module.exports = getEntityLogs;