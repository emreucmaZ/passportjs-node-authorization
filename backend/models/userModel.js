const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  roleId: String,
  roles:[]
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
