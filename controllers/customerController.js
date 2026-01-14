const User = require("../models/user");
const Customer = require("../models/customerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * REGISTER CUSTOMER
 */
exports.registerCustomer = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone and password required",
      });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1️⃣ Create USER
    const user = await User.create({
      phone,
      password: hashedPassword,
      role: "customer",
    });

    // 2️⃣ Create CUSTOMER profile
    await Customer.create({
      user: user._id,
      name,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
    });
  } catch (error) {
    console.error("registerCustomer error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * LOGIN CUSTOMER
 */
exports.loginCustomer = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone and password required",
      });
    }

    const user = await User.findOne({ phone, role: "customer" });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("loginCustomer error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
