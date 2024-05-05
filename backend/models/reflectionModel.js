import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reflectionSchema = new Schema(
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

export default mongoose.model("Reflection", reflectionSchema);

