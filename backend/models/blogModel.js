const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const blogSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Otomatik _id oluşturmayı devre dışı bırakır
  },
  title: { type: String, unique: true },
  content: String,
  blogImageName: String
});


const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;
