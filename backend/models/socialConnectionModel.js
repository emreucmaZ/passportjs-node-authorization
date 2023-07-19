const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const socialConnectionSchema = new mongoose.Schema({
  connectionTitle: { type: String, unique: true },
  connectionUrl: String,
  connectionImageUrl: String
});


const SocialConnection = mongoose.model("SocialConnection",socialConnectionSchema);

module.exports = SocialConnection;
