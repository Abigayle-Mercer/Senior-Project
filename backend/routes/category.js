const express = require("express");
const {
  createCategory,
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const router = express.Router();

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

module.exports = router;
