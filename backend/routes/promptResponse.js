const express = require("express");
const {
  createPromptResponse,
  getPromptResponses,
  getPromptResponse,
  deletePromptResponse,
  updatePromptResponse,
} = require("../controllers/promptResponseController");
const router = express.Router();

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

module.exports = router;
