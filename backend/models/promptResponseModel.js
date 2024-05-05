import mongoose from "mongoose";

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

export default mongoose.model("PromptResponse", promptResponseSchema);

