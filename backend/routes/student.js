const express = require("express");
const {
  createStudent,
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentController");
const router = express.Router();

// get all students
router.get("/", getStudents);

// GET a singl student
router.get("/:id", getStudent);
// POST a new student
router.post("/", createStudent);

// DELETE a student
router.delete("/:id", deleteStudent);

// UPDATE a student
router.patch("/:id", updateStudent);

module.exports = router;
