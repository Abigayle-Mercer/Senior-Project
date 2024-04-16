const Prompt = require("../models/promptModel");
const mongoose = require("mongoose");

// get all Prompts
const getPrompts = async (req, res) => {
  const prompts = await Prompt.find({}).sort({ createdAt: -1 });

  res.status(200).json(prompts);
};

// get a single prompt
const getPrompt = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such prompt" });
  }
  const prompt = await Prompt.findById(id);

  if (!prompt) {
    return res.status(404).json({ error: "No such prompt" });
  }

  res.status(200).json(prompt);
};
// create new prompt
const createPrompt = async (req, res) => {
  const { text, categoryId } = req.body;
  // add doc to db
  try {
    const prompt = await Prompt.create({ text, categoryId });
    res.status(200).json(prompt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a prompt

const deletePrompt = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such prompt" });
  }

  const prompt = await Prompt.findOneAndDelete({ _id: id });

  if (!prompt) {
    return res.status(404).json({ error: "No such prompt" });
  }
  res.status(200).json(prompt);
};

// update a prompt

const updatePrompt = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such prompt" });
  }

  const prompt = await Prompt.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!prompt) {
    return res.status(404).json({ error: "No such Prompt" });
  }
  res.status(200).json(prompt);
};

module.exports = {
  createPrompt,
  getPrompts,
  getPrompt,
  deletePrompt,
  updatePrompt,
};
