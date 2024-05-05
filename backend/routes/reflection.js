import express from "express";
import {
  createReflection,
  getReflections,
  getReflection,
  deleteReflection,
  updateReflection,
} from "../controllers/reflectionController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();
router.use(authenticateUser);

// get all reflections
router.get("/", getReflections);

// GET a singl reflection
router.get("/:id", getReflection);
// POST a new reflection
router.post("/", createReflection);

// DELETE a reflection
router.delete("/:id", deleteReflection);

// UPDATE a reflection
router.patch("/:id", updateReflection);

export { router as reflectionRoutes }; // Export surveyRoutes

