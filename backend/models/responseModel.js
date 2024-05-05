import mongoose from "mongoose";

const Schema = mongoose.Schema;

const responseSchema = new Schema(
  {
    studentId: {
      type: String,
    },
    date: {
      type: Date,
    },
    surveyId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Response", responseSchema);
