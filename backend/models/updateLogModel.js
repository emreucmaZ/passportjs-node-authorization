const mongoose = require("mongoose");

const updateLogSchema = new mongoose.Schema({
  user:Object,
  table:String,
  requestBody:Object,
  oldData:Object,
  timestamp:Date
});

const UpdateLog = mongoose.model("UpdateLog", updateLogSchema);

module.exports = UpdateLog;
