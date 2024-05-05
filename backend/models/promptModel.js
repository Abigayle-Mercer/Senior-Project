import mongoose from "mongoose";

const Schema = mongoose.Schema;

const promptSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Prompt", promptSchema);

