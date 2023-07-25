const mongoose = require("mongoose");

const entityLogSchema = new mongoose.Schema({
  user:Object,
  table:String,
  data:{type:Object,required:false},
  type:String,
  oldData:{type:Object,required:false},
  deletedData:{type:Object,required:false},
  timestamp:Date
});

const EntityLog = mongoose.model("EntityLog", entityLogSchema);

module.exports = EntityLog;
