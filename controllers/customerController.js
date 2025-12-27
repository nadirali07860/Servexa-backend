const bcrypt = require("bcryptjs");
const Customer = require("../models/customerModel");
const generateToken = require("../utils/generateToken");

// REGISTER CUSTOMER
exports.registerCustomer = async (req, res) => {
  try {
    const { name, phone, email, address, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        error: "Name, phone aur password required hai",
      });
    }

    const existing = await Customer.findOne({ phone });
    if (existing) {
      return res.status(400).json({
        error: "Ye phone pehle se registered hai",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      name,
      phone,
      email,
      address,
      password: hashedPassword,
    });

    const token = generateToken(customer._id);

    res.json({
      message: "Customer registered",
      customer: {
        id: customer._id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN CUSTOMER
exports.loginCustomer = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const customer = await Customer.findOne({ phone });
    if (!customer) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(customer._id);

    res.json({
      message: "Login successful",
      customer: {
        id: customer._id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PROFILE (requires token)
exports.getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id).select("-password");
    if (!customer) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ profile: customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
