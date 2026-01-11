const User = require("../models/user");
const Technician = require("../models/technicianModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
|--------------------------------------------------------------------------
| REGISTER (customer / technician / admin)
|--------------------------------------------------------------------------
*/
exports.register = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    if (!phone || !password || !role) {
      return res.status(400).json({ error: "Phone, password and role required" });
    }

    const exists = await User.findOne({ phone });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 🔐 ALWAYS hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      role,
      isBlocked: false
    });

    res.json({
      id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/*
|--------------------------------------------------------------------------
| LOGIN (customer / technician / admin)
|--------------------------------------------------------------------------
*/
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: "Phone and password required" });
    }

    let user = await User.findOne({ phone });

    // Technician fallback (if needed later)
    if (!user) {
      const technician = await Technician.findOne({ phone });
      if (technician) {
        user = technician;
      }
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ error: "User is blocked by admin" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role,
      id: user._id
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
