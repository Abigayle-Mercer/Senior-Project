const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reflectionResponseSchema = new Schema(
  {
    reflectionId: {
      type: String,
    },
    responseId: {
      type: String,
    },
    input: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReflectionResponse", reflectionResponseSchema);
