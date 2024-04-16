const express = require("express");
const {
  createReflection,
  getReflection,
  getReflection,
  deleteReflection,
  updateReflection,
} = require("../controllers/reflectionController");
const router = express.Router();

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

module.exports = router;
