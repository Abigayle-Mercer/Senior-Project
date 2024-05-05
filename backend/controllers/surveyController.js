import Survey from "../models/surveyModel.js";
import mongoose from "mongoose";
// get all surveys
export const getSurveys = async (req, res) => {
  const surveys = await Survey.find({}).sort({ createdAt: -1 });

  res.status(200).json(surveys);
};

// get a single survey
export const getSurvey = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such survey" });
  }
  const survey = await Survey.findById(id);

  if (!survey) {
    return res.status(404).json({ error: "No such Survey" });
  }

  res.status(200).json(survey);
};
// create new survey
export const createSurvey = async (req, res) => {
  const { title, authorId } = req.body;
  // add doc to db
  try {
    const survey = await Survey.create({ title, authorId });
    res.status(200).json(survey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a survey

export const deleteSurvey = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such survey" });
  }

  const survey = await Survey.findOneAndDelete({ _id: id });

  if (!survey) {
    return res.status(404).json({ error: "No such Survey" });
  }
  res.status(200).json(survey);
};

// update a survey

export const updateSurvey = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such survey" });
  }

  const survey = await Survey.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!survey) {
    return res.status(404).json({ error: "No such Survey" });
  }
  res.status(200).json(survey);
};


