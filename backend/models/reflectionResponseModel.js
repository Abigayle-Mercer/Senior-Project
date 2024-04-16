const { interpolate } = require("d3");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reflectionResponseSchema = new Schema(
  {
    reflectionId: {
      type: int,
    },
    responseId: {
      type: int,
    },
    input: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReflectionResponse", reflectionResponseSchema);
