const User = require("../models/user");
const Technician = require("../models/technicianModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================
// REGISTER TECHNICIAN
// ============================
exports.registerTechnician = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      phone,
      password: hashedPassword,
      role: "technician",
    });

    await Technician.create({
      user: user._id,   // 🔥 THIS WAS MISSING
      name,
      phone,
      isAvailable: true,
    });

    res.json({ success: true, message: "Technician registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// LOGIN TECHNICIAN
// ============================
exports.loginTechnician = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone, role: "technician" });
    if (!user) {
      return res.status(404).json({ message: "Technician not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
