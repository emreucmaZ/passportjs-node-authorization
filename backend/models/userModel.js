const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  username: { type: String, unique: true,required:true },
  password: {type:String,required:true},
  roleId: String,
  roles:[],
  creationDate:Date
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.verifyHashedPassword = function (password) {
  if(password == this.password) {
    return true
  }
  return false
};

const User = mongoose.model("User", userSchema);

module.exports = User;
