import ReflectionResponse from "../models/reflectionResponseModel.js";
import mongoose from "mongoose";

// get all Reflection Responses
export const getReflectionResponses = async (req, res) => {
  const reflectionResponses = await ReflectionResponse.find({}).sort({
    createdAt: -1,
  });

  res.status(200).json(reflectionResponses);
};

// get a single reflection response
export const getReflectionResponse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reflection response" });
  }
  const reflectionResponse = await ReflectionResponse.findById(id);

  if (!reflectionResponse) {
    return res.status(404).json({ error: "No such reflection response" });
  }

  res.status(200).json(reflectionResponse);
};
// create new reflection response
export const createReflectionResponse = async (req, res) => {
  const { reflectionId, responseId, input } = req.body;
  // add doc to db
  try {
    const reflectionResponse = await ReflectionResponse.create({
      reflectionId,
      responseId,
      input,
    });
    res.status(200).json(reflectionResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a reflection response

export const deleteReflectionResponse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reflection response" });
  }

  const reflectionResponse = await ReflectionResponse.findOneAndDelete({
    _id: id,
  });

  if (!reflectionResponse) {
    return res.status(404).json({ error: "No such reflection response" });
  }
  res.status(200).json(reflectionResponse);
};

// update a reflection response

export const updateReflectionResponse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reflection response" });
  }

  const reflectionResponse = await ReflectionResponse.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!reflectionResponse) {
    return res.status(404).json({ error: "No such reflection response" });
  }
  res.status(200).json(reflectionResponse);
};


