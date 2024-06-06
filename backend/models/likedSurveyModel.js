import mongoose from "mongoose";

const { Schema } = mongoose;

const likedSurveySchema = new Schema(
  {
    authorId: {
      type: String,
    },
    surveyId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LikedSurvey", likedSurveySchema);
