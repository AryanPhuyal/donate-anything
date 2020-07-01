const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const threadSchema = new Schema({
  name: String,
  image: String,
  dateBought: Date,
  dateUpdate: Date,
  faultDescription: String,
  description: String,
});

module.exports = mongoose.model("Thread", threadSchema);
