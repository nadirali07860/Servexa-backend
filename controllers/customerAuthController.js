const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Customer = require("../models/customerModel");

/**
 * CUSTOMER REGISTER
 */
exports.registerCustomer = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      phone,
      password: hashedPassword,
      role: "customer"
    });

    await Customer.create({
      user: user._id,
      name,
      phone
    });

    res.json({ success: true, message: "Customer registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * CUSTOMER LOGIN
 */
exports.loginCustomer = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone, role: "customer" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
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
