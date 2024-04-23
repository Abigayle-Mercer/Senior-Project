const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const promptResponseSchema = new Schema(
  {
    responseId: {
      type: String,
    },
    promptId: {
      type: String,
    },
    value: {
        type: Number,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PromptResponse", promptResponseSchema);
