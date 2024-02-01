const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
  },
  password: String,
  phone: {
    type: Number,
  },
  primary_address: String,
  secondary_address: String,
  createdAt: {
    type: String,
    immutable: true,
  },
  createdOn: {
    type: String,
    immutable: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
