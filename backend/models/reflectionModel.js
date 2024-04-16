const { interpolate } = require("d3");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reflectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    surveyId: {
      type: int,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reflection", reflectionSchema);
