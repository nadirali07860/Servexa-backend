const Category = require("../models/Category");

// ✅ Get all categories (admin + app dono use kar sakte)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json({ categories });
  } catch (err) {
    console.error("getCategories error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create new category (admin)
exports.createCategory = async (req, res) => {
  try {
    const { name, icon, basePrice } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name required hai" });
    }

    const category = await Category.create({
      name,
      icon: icon || "",
      basePrice: basePrice || 0,
    });

    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    console.error("createCategory error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name, icon, basePrice } = req.body;

    const update = {};
    if (name !== undefined) update.name = name;
    if (icon !== undefined) update.icon = icon;
    if (basePrice !== undefined) update.basePrice = basePrice;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category nahi mili" });
    }

    res.json({ message: "Category updated", category });
  } catch (err) {
    console.error("updateCategory error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category nahi mili" });
    }

    // NOTE: Abhi hum services / subservices ko touch nahi kar rahe.
    // Baad me cascade delete ya prevent-delete logic add kar sakte hain.

    res.json({ message: "Category deleted", category });
  } catch (err) {
    console.error("deleteCategory error:", err);
    res.status(500).json({ error: err.message });
  }
};
