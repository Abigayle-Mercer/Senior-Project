import express from "express";
import  {
  createTeacher,
  getTeacher,
  getTeachers,
  deleteTeacher,
  updateTeacher,
} from "../controllers/teacherController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();
router.use(authenticateUser);

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

export { router as teacherRoutes }; // Export surveyRoutes
