import PromptResponse from "../models/promptResponseModel.js";
import mongoose from "mongoose";

// get all Prompts
export const getPromptResponses = async (req, res) => {
  const promptResponses = await PromptResponse.find({}).sort({ createdAt: -1 });

  res.status(200).json(promptResponses);
};

// get a single prompt
export const getPromptResponse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such prompt response" });
  }
  const promptResponse = await PromptResponse.findById(id);

  if (!promptResponse) {
    return res.status(404).json({ error: "No such prompt response" });
  }

  res.status(200).json(promptResponse);
};
// create new prompt
export const createPromptResponse = async (req, res) => {
  const { responseId, promptId, value } = req.body;
  // add doc to db
  try {
    const promptResponse = await PromptResponse.create({ responseId, promptId, value });
    res.status(200).json(promptResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a prompt

export const deletePromptResponse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such prompt response" });
  }

  const promptResponse = await PromptResponse.findOneAndDelete({ _id: id });

  if (!promptResponse) {
    return res.status(404).json({ error: "No such prompt response" });
  }
  res.status(200).json(promptResponse);
};

// update a prompt response

export const updatePromptResponse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such prompt response" });
  }

  const promptResponse = await PromptResponse.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!promptResponse) {
    return res.status(404).json({ error: "No such Prompt response" });
  }
  res.status(200).json(promptResponse);
};

