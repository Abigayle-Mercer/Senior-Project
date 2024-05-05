import express from "express";
import {
  createStudent,
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
} from "../controllers/studentController.js";
import  { authenticateUser } from "../auth.js";
const router = express.Router();
router.use(authenticateUser);

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

export { router as studentRoutes }; // Export surveyRoutes
