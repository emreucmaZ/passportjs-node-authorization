const EntityLog = require("../../models/entityLogModel");

function logger() {
  function logCreatedEntity(user, table, data) {
    const entityLog = new EntityLog({
      user: user,
      table: table,
      data: data,
      type:'create',
      timestamp: new Date(),
    });
    entityLog.save();
  }
  function logUpdatedEntity(user, table, data,oldData) {
    const entityLog = new EntityLog({
      user: user,
      table: table,
      type:'update',
      data: data,
      oldData:oldData,
      timestamp: new Date(),
    });
    entityLog.save();
  }
  function logDeletedEntity(user, table, deletedObject) {
    const entityLog = new EntityLog({
      user: user,
      table: table,
      deletedData:deletedObject,
      type:'delete',
      timestamp: new Date(),
    });
    entityLog.save();
  }

  return {
    logCreatedEntity,
    logUpdatedEntity,
    logDeletedEntity,
  };
}

module.exports = logger;
