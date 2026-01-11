const Category = require("../models/categoryModel");

// ============================
// CREATE CATEGORY
// ============================
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({ name });

    res.json({
      success: true,
      category,
    });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ============================
// GET ALL CATEGORIES
// ============================
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      categories,
    });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
