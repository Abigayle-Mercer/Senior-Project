const Reflection = require("../models/reflectionModel");
const mongoose = require("mongoose");

// get all reflections
const getReflections = async (req, res) => {
  const reflections = await Reflection.find({}).sort({ createdAt: -1 });

  res.status(200).json(reflections);
};

// get a single reflection
const getReflection = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reflection" });
  }
  const reflection = await Reflection.findById(id);

  if (!reflection) {
    return res.status(404).json({ error: "No such Reflection" });
  }

  res.status(200).json(reflection);
};
// create new reflection
const createReflection = async (req, res) => {
  const { title, surveyId } = req.body;
  // add doc to db
  try {
    const reflection = await Reflection.create({ title, surveyId });
    res.status(200).json(reflection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a reflection

const deleteReflection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reflection" });
  }

  const reflection = await Reflection.findOneAndDelete({ _id: id });

  if (!reflection) {
    return res.status(404).json({ error: "No such reflection" });
  }
  res.status(200).json(reflection);
};

// update a reflection

const updateReflection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reflection" });
  }

  const reflection = await Reflection.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!reflection) {
    return res.status(404).json({ error: "No such reflection" });
  }
  res.status(200).json(reflection);
};

module.exports = {
  createReflection,
  getReflections,
  getReflection,
  deleteReflection,
  updateReflection,
};
