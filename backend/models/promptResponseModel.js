const { interpolate } = require("d3");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const promptResponseSchema = new Schema(
  {
    responseId: {
      type: int,
    },
    promptId: {
      type: int,
    },
    value: {
        type: int,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PromptResponse", promptResponseSchema);
