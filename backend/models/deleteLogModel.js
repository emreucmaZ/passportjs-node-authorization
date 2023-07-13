const mongoose = require("mongoose");

const deleteLogSchema = new mongoose.Schema({
  user:Object,
  table:String,
  deletedObject:Object,
  timestamp:Date
});

const DeleteLog = mongoose.model("DeleteLog", deleteLogSchema);

module.exports = DeleteLog;
