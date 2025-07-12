const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// ✅ Hash password if it's new or modified
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // ← Only skip if NOT modified

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Optional: helper method to compare passwords
adminSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
