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
    type: String,
  },
  password: String,
  photo: String,
  createdAt: Date,
  modifiedAt: Date,
  BusinessName: String,
  deactivated: Boolean,
  deleted: Boolean,
  // threads: [
  //   {
  //     threadId: mongoose.Schema.Types.ObjectId,
  //     ref: "Thread",
  //   },
  // ],
  // followers: [
  //   {
  //     followerId: mongoose.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  // following: [
  //   {
  //     followingId: mongoose.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});

module.exports = mongoose.model("User", userSchema);
