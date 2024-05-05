import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    surveyId: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", categorySchema);
