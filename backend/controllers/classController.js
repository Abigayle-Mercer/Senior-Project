import Class from "../models/classModel.js";
import mongoose from "mongoose";

// get all categorys
export const getClasses = async (req, res) => {
  const classes = await Class.find({}).sort({ createdAt: -1 });

  res.status(200).json(classes);
};

// get a single category
export const getClass = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such class" });
  }
  const classs = await Class.findById(id);

  if (!classs) {
    return res.status(404).json({ error: "No such class" });
  }

  res.status(200).json(classs);
};
// create new category
export const createClass = async (req, res) => {
  const { title, adminId } = req.body;
  // add doc to db
  try {
    const classs = await Class.create({ title, adminId });
    res.status(200).json(classs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a category
export const deleteClass = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such class" });
  }

  const classs = await Class.findOneAndDelete({ _id: id });

  if (!classs) {
    return res.status(404).json({ error: "No such Class" });
  }
  res.status(200).json(classs);
};

// update a category

export const updateClass = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such class" });
  }

  const classs = await Class.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!classs) {
    return res.status(404).json({ error: "No such Class" });
  }
  res.status(200).json(classs);
};
