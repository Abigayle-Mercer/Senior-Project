const express = require("express");
const {
  createPrompt,
  getPrompts,
  getPrompt,
  deletePrompt,
  updatePrompt,
} = require("../controllers/promptController");
const router = express.Router();

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

module.exports = router;
