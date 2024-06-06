import LikedSurvey from "../models/likedSurveyModel.js";
import mongoose from "mongoose";
// get all surveys
export const getLikedSurveys = async (req, res) => {
  const likedsurveys = await LikedSurvey.find({}).sort({ createdAt: -1 });

  res.status(200).json(likedsurveys);
};

// get a single survey
export const getLikedSurvey = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such liked survey" });
  }
  const likedsurvey = await LikedSurvey.findById(id);

  if (!likedsurvey) {
    return res.status(404).json({ error: "No such Liked Survey" });
  }

  res.status(200).json(likedsurvey);
};
// create new survey
export const createLikedSurvey = async (req, res) => {
  const { surveyId, authorId } = req.body;
  // add doc to db
  try {
    const likedsurvey = await LikedSurvey.create({surveyId, authorId });
    res.status(200).json(likedsurvey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a survey

export const deleteLikedSurvey = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such liked survey" });
  }

  const likedsurvey = await LikedSurvey.findOneAndDelete({ _id: id });

  if (!likedsurvey) {
    return res.status(404).json({ error: "No such Liked Survey" });
  }
  res.status(200).json(likedsurvey);
};

// update a survey

export const updateLikedSurvey = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Liked Survey" });
  }

  const likedsurvey = await LikedSurvey.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!likedsurvey) {
    return res.status(404).json({ error: "No such Liked Survey" });
  }
  res.status(200).json(likedsurvey);
};
