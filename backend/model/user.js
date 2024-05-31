const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  user_input_no: { type: [Number], required: true }
});

module.exports = mongoose.model("User", UserSchema);
