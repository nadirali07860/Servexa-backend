const Service = require("../models/Service");

// Create a new main service
exports.createService = async (req, res) => {
  try {
    const { name, icon, description, price, categoryId } = req.body;

    const service = await Service.create({
      name,
      icon,
      description,
      price,
      categoryId
    });

    res.json({
      message: "Service created",
      service,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all main services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ services });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
