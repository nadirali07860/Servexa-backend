const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

const adminAuth = require("../middlewares/adminAuthMiddleware");

// admin only
router.post("/", adminAuth, createCategory);

// public
router.get("/", getCategories);

module.exports = router;
