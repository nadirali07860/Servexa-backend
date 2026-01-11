const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");

/**
 * REGISTER CUSTOMER
 */
exports.registerCustomer = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    const existing = await Customer.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Customer registered successfully",
    });
  } catch (err) {
    console.error("registerCustomer error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * LOGIN CUSTOMER (PHONE + PASSWORD)
 */
exports.loginCustomer = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    const customer = await Customer.findOne({ phone });

    if (!customer) {
      return res.status(401).json({ message: "Customer not found" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: customer._id, role: "customer" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
    });
  } catch (err) {
    console.error("loginCustomer error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
