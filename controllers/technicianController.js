const Technician = require("../models/technicianModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.registerTechnician = async (req, res) => {
  try {
    const { name, phone, skill, password } = req.body;

    const exists = await Technician.findOne({ phone });
    if (exists) return res.status(400).json({ error: "Phone already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const technician = await Technician.create({
      name,
      phone,
      skill,
      password: hashed
    });

    res.json({ message: "Technician registered", technician });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginTechnician = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const tech = await Technician.findOne({ phone });
    if (!tech) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, tech.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    res.json({
      message: "Login successful",
      technician: tech,
      token: generateToken(tech._id)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTechnicianProfile = async (req, res) => {
  try {
    const tech = await Technician.findById(req.user.id).select("-password");
    res.json({ profile: tech });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};