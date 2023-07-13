const CreateLog = require("../../models/createLogModel");
const DeleteLog = require("../../models/deleteLogModel");
const UpdateLog = require("../../models/updateLogModel");

function logger() {
  function logCreateAction(user, table, data) {
    const newCreateLog = new CreateLog({
      user: user,
      table: table,
      data: data,
      timestamp: new Date(),
    });
    newCreateLog.save();
  }
  function logUpdateAction(user, table, data,oldData) {
    const newUpdateLog = new UpdateLog({
      user: user,
      table: table,
      requestBody: data,
      oldData:oldData,
      timestamp: new Date(),
    });
    newUpdateLog.save();
  }
  function logDeleteAction(user, table, deletedObject) {
    const newDeleteLog = new DeleteLog({
      user: user,
      table: table,
      deletedObject:deletedObject,
      timestamp: new Date(),
    });
    newDeleteLog.save();
  }

  return {
    logCreateAction,
    logUpdateAction,
    logDeleteAction,
  };
}

module.exports = logger;
