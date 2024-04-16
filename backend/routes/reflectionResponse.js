const express = require("express");
const {
  createReflectionResponse,
  getReflectionResponses,
  getReflectionResponse,
  deleteReflectionResponse,
  updateReflectionResponse,
} = require("../controllers/reflectionResponseController");
const router = express.Router();

// get all Reflections
router.get("/", getReflectionResponses);

// GET a singl Reflection
router.get("/:id", getReflectionResponse);
// POST a new Reflection
router.post("/", createReflectionResponse);

// DELETE a Reflection
router.delete("/:id", deleteReflectionResponse);

// UPDATE a Reflection
router.patch("/:id", updateReflectionResponse);

module.exports = router;
