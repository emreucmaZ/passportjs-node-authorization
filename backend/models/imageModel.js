const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: String,
  filename: { type: String, unique: true },
  creatorId:String,
  creationTime:Date
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
