import Technician from "../models/technicianModel.js";
import generateToken from "../utils/generateToken.js";

// Technician Register
export const registerTechnician = async (req, res) => {
  try {
    const { name, phone, skill, password } = req.body;

    if (!name || !phone || !skill || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const exists = await Technician.findOne({ phone });
    if (exists) {
      return res.status(400).json({ error: "Phone already registered" });
    }

    const newTech = new Technician({
      name,
      phone,
      skill,
      password,
    });

    await newTech.save();

    res.json({ message: "Technician registered", technician: newTech });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Technician Login
export const loginTechnician = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const tech = await Technician.findOne({ phone });

    if (!tech) {
      return res.status(404).json({ error: "Technician not found" });
    }

    if (tech.password !== password) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      technician: tech,
      token: generateToken(tech._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Technician Profile
export const getTechnicianProfile = async (req, res) => {
  try {
    const tech = await Technician.findById(req.user.id);

    if (!tech) {
      return res.status(404).json({ error: "Technician not found" });
    }

    res.json(tech);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Technician
export const updateTechnician = async (req, res) => {
  try {
    const updated = await Technician.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Profile updated", technician: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
