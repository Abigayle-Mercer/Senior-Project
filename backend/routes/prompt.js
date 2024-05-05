import express from "express";
import {
  createPrompt,
  getPrompts,
  getPrompt,
  deletePrompt,
  updatePrompt,
} from "../controllers/promptController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();
router.use(authenticateUser);
// get all Prompts
router.get("/", getPrompts);

// GET a singl Prompt
router.get("/:id", getPrompt);
// POST a new Prompt
router.post("/", createPrompt);

// DELETE a Prompt
router.delete("/:id", deletePrompt);

// UPDATE a Prompt
router.patch("/:id", updatePrompt);

export { router as promptRoutes }; // Export surveyRoutes


