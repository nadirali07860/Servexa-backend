const Service = require("../models/serviceModel");
const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

/**
 * =========================
 * CREATE SERVICE (ADMIN)
 * =========================
 */
exports.createService = async (req, res) => {
  try {
    const { name, category, basePrice, discount } = req.body;

    if (!name || !category || basePrice === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const finalPrice =
      discount && discount > 0
        ? basePrice - (basePrice * discount) / 100
        : basePrice;

    const service = await Service.create({
      name,
      category,
      basePrice,
      discount: discount || 0,
      finalPrice,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      service,
    });
  } catch (err) {
    console.error("createService error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * =========================
 * GET SERVICES BY CATEGORY (CUSTOMER)
 * =========================
 */
exports.getServicesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const services = await Service.find({
      category: categoryId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      services,
    });
  } catch (err) {
    console.error("getServicesByCategory error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
