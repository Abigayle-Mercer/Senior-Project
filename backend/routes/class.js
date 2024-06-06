import express from "express";
import {
  createClass,
  getClass,
  getClasses,
  deleteClass,
  updateClass,
} from "../controllers/classController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();
router.use(authenticateUser);

// get all categories
router.get("/", getClasses);

// GET a singl category
router.get("/:id", getClass);
// POST a new category
router.post("/", createClass);

// DELETE a category
router.delete("/:id", deleteClass);

// UPDATE a category
router.patch("/:id", updateClass);

export { router as classRoutes }; // Export surveyRoutes
