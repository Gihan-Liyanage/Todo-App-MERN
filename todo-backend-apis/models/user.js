const mongoose = require("mongoose");
/**
 * Creating user schema and model.
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
});

const User = mongoose.model("User", userSchema);

exports.User = User;
