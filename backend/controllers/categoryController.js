import Category from "../models/categoryModel.js";
import mongoose from "mongoose";

// get all categorys
export const getCategories = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 });

  res.status(200).json(categories);
};

// get a single category
export const getCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such category" });
  }
  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({ error: "No such category" });
  }

  res.status(200).json(category);
};
// create new category
export const createCategory = async (req, res) => {
  const { title, surveyId } = req.body;
  // add doc to db
  try {
    const category = await Category.create({ title, surveyId });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such category" });
  }

  const category = await Category.findOneAndDelete({ _id: id });

  if (!category) {
    return res.status(404).json({ error: "No such Category" });
  }
  res.status(200).json(category);
};

// update a category

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such category" });
  }

  const category = await Category.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!category) {
    return res.status(404).json({ error: "No such Category" });
  }
  res.status(200).json(category);
};


