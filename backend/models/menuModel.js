const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  title: {type:String,unique:true},
  content:String,
  route:{type:String,unique:true},
  parentId:String
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
