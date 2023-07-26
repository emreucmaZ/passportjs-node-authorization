const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: String,
  filename: { type: String, unique: true },
  creator:Object,
  creationDate:Date
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
