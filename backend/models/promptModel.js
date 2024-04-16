const { interpolate } = require("d3");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const promptSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    categoryId: {
      type: int,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prompt", promptSchema);
