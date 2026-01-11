const Category = require("../models/categoryModel");
const Service = require("../models/serviceModel");

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL CATEGORIES
exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// CREATE SERVICE
exports.createService = async (req, res) => {
  try {
    const { name, categoryId, basePrice, discount } = req.body;

    const service = await Service.create({
      name,
      category: categoryId,
      basePrice,
      discount,
      finalPrice: basePrice - (basePrice * discount) / 100
    });

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE SERVICE
exports.updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const update = req.body;

    const service = await Service.findByIdAndUpdate(
      serviceId,
      update,
      { new: true }
    );

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET SERVICES BY CATEGORY
exports.getServicesByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const services = await Service.find({ category: categoryId });
  res.json(services);
};

// 🔒 BLOCK / UNBLOCK USER (ADMIN)
exports.blockUser = async (req, res) => {
  try {
    const { userId, block } = req.body;

    const User = require("../models/user");
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = block;
    await user.save();

    res.json({
      success: true,
      message: block ? "User blocked successfully" : "User unblocked successfully",
    });
  } catch (err) {
    console.error("Block user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

