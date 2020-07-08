const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  name: String,
  image: String,
  dateBought: Date,
  faultDescription: String,
  description: String,
  createdDate: Date,
  modifiedDate: Date,
  status: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Thread", threadSchema);
