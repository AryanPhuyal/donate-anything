const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
  },
  imageUrl: String,
  createdDateL: Date,
  modifiedDate: Date,
  threads: [
    {
      threadId: {
        type: mongoose.Types.ObjectId,
        ref: "Thread",
      },
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
