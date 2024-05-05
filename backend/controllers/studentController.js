import Student from "../models/studentModel.js";
import mongoose from "mongoose";

// get all tudents
export const getStudents = async (req, res) => {
  const students = await Student.find({}).sort({ createdAt: -1 });

  res.status(200).json(students);
};

// get a single student
export const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }
  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  res.status(200).json(student);
};
// create new student
export const createStudent = async (req, res) => {
  const { name, email, password } = req.body;
  // add doc to db
  try {
    const student = await Student.create({ name, email, password });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a student

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(404).json({ error: "No such Student" });
  }
  res.status(200).json(student);
};

// update a student

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }
  res.status(200).json(student);
};


