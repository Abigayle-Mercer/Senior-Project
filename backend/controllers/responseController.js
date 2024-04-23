const Response = require("../models/responseModel");
const mongoose = require("mongoose");

// get all responses
const getResponses = async (req, res) => {
  const responses = await Response.find({}).sort({ createdAt: -1 });

  res.status(200).json(responses);
};

// get a single responses
const getResponse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such response" });
  }
  const response = await Response.findById(id);

  if (!response) {
    return res.status(404).json({ error: "No such response" });
  }

  res.status(200).json(response);
};
// create new responses
const createResponse = async (req, res) => {
  const { studentId, date, surveyId } = req.body;
  // add doc to db
  try {
    const response = await Response.create({ studentId, date, surveyId });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a response

const deleteResponse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such response" });
  }

  const response = await Response.findOneAndDelete({ _id: id });

  if (!response) {
    return res.status(404).json({ error: "No such response" });
  }
  res.status(200).json(response);
};

// update a response

const updateResponse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such response" });
  }

  const response = await Response.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!response) {
    return res.status(404).json({ error: "No such response" });
  }
  res.status(200).json(response);
};

module.exports = {
  createResponse,
  getResponses,
  getResponse,
  deleteResponse,
  updateResponse,
};
