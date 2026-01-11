const SubService = require("../models/subServiceModel");

// CREATE sub service
const createSubService = async (req, res) => {
  try {
    const subService = await SubService.create(req.body);
    res.json({
      message: "SubService created",
      subService
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all sub services
const getSubServices = async (req, res) => {
  const subServices = await SubService.find()
    .populate("service");
  res.json(subServices);
};

module.exports = {
  createSubService,
  getSubServices
};
