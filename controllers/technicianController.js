const Technician = require("../models/technicianModel");

// ==========================
// GET TECHNICIAN PROFILE
// ==========================
const getTechnicianProfile = async (req, res) => {
  try {
    const technician = await Technician.findById(req.user._id).select("-password");

    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    res.json(technician);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// UPDATE TECHNICIAN PROFILE
// ==========================
const updateTechnicianProfile = async (req, res) => {
  try {
    const technician = await Technician.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.json(technician);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTechnicianProfile,
  updateTechnicianProfile,
};
