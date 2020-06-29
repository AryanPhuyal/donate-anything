const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  dateOfBirth: String,
  gender: String,
  accountStatus: {
    type: Boolean,
    default: false,
  },
  role: {
    type: mongoose.Types.ObjectId,
    ref: "Role",
  },
  password: String,
  photo: String,
  createdAt: Date,
  modifiedAt: Date,
});

module.exports = mongoose.model("User", userSchema);