const express = require("express");
const {
  createTecher,
  getTeacher,
  getTeachers,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/teacherController");
const router = express.Router();

// get all teachers
router.get("/", getTeachers);

// GET a singl teacher
router.get("/:id", getTeacher);
// POST a new teacher
router.post("/", createTeacher);

// DELETE a teacher
router.delete("/:id", deleteTeacher);

// UPDATE a teacher
router.patch("/:id", updateTeacher);

module.exports = router;
