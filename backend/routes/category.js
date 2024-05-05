import express from "express";
import {
  createCategory,
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();
router.use(authenticateUser);

// get all categories
router.get("/", getCategories);

// GET a singl category
router.get("/:id", getCategory);
// POST a new category
router.post("/", createCategory);

// DELETE a category
router.delete("/:id", deleteCategory);

// UPDATE a category
router.patch("/:id", updateCategory);

export { router as categoryRoutes }; // Export surveyRoutes
