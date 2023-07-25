const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const blogSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: String,
  content: String,
  blogImageName: String,
  creatorId:String,
  isDeleted:Boolean,
  isApproved:Boolean
});


const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;
