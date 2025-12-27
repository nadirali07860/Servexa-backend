const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// ✅ Get all categories
router.get("/", getCategories);

// ✅ Create category (admin)
router.post("/", createCategory);

// ✅ Update category (admin)
router.put("/:id", updateCategory);

// ✅ Delete category (admin)
router.delete("/:id", deleteCategory);

module.exports = router;
