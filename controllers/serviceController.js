const Service = require("../models/serviceModel");
const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

exports.createService = async (req, res) => {
  try {
    const { name, category, basePrice, discount } = req.body;

    if (!name || !category || basePrice == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ message: "Category not found" });
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
    });

    res.status(201).json({
      success: true,
      service,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
