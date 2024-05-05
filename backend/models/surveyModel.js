import mongoose from "mongoose";

const { Schema } = mongoose;

const surveySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Survey", surveySchema);
