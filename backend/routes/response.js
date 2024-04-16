const express = require("express");
const {
  createResponse,
  getResponses,
  getResponse,
  deleteResponse,
  updateResponse,
} = require("../controllers/responseController");
const router = express.Router();

// get all Responses
router.get("/", getResponses);

// GET a singl response
router.get("/:id", getResponse);
// POST a new response
router.post("/", createResponse);

// DELETE a response
router.delete("/:id", deleteResponse);

// UPDATE a response
router.patch("/:id", updateResponse);

module.exports = router;
