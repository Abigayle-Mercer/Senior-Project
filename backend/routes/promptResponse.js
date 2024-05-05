import express from "express";
import {
  createPromptResponse,
  getPromptResponses,
  getPromptResponse,
  deletePromptResponse,
  updatePromptResponse,
} from "../controllers/promptResponseController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();
router.use(authenticateUser);

// get all Prompts
router.get("/", getPromptResponses);

// GET a singl Prompt
router.get("/:id", getPromptResponse);
// POST a new Prompt
router.post("/", createPromptResponse);

// DELETE a Prompt
router.delete("/:id", deletePromptResponse);

// UPDATE a Prompt
router.patch("/:id", updatePromptResponse);

export { router as promptResponseRoutes }; // Export surveyRoutes

