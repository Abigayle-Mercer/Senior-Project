const Teacher = require("../models/teacherModel");
const mongoose = require("mongoose");

// get all teachers
const getTeachers = async (req, res) => {
  const teachers = await Teacher.find({}).sort({ createdAt: -1 });

  res.status(200).json(teachers);
};

// get a single teacher
const getTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such teacher" });
  }
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    return res.status(404).json({ error: "No such teacher" });
  }

  res.status(200).json(teacher);
};
// create new teacher
const createTeacher = async (req, res) => {
  const { name, email, password, district } = req.body;
  // add doc to db
  try {
    const teacher = await Teacher.create({ name, email, password, district });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a teacher

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such teacher" });
  }

  const teacher = await Teacher.findOneAndDelete({ _id: id });

  if (!teacher) {
    return res.status(404).json({ error: "No such teacher" });
  }
  res.status(200).json(teacher);
};

// update a teacher

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such teacher" });
  }

  const teacher = await Teacher.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!teacher) {
    return res.status(404).json({ error: "No such teacher" });
  }
  res.status(200).json(teacher);
};


module.exports = {
  createTeacher,
  getTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher,
};
