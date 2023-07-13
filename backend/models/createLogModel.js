const mongoose = require("mongoose");

const createLogSchema = new mongoose.Schema({
  user:Object,
  table:String,
  data:Object,
  timestamp:Date
});

const CreateLog = mongoose.model("CreateLog", createLogSchema);

module.exports = CreateLog;
