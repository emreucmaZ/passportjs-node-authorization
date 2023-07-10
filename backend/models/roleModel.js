const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  permissions: [String],
});

// Role modelini oluşturun
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
