const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const socialConnectionSchema = new mongoose.Schema({
  connectionTitle: String,
  connectionUrl: String,
  connectionImageUrl: String,
  creator:Object,
  creationDate:Date,
  isDeleted:Boolean
});


const SocialConnection = mongoose.model("SocialConnection",socialConnectionSchema);

module.exports = SocialConnection;
