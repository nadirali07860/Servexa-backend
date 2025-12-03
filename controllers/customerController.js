import Customer from "../models/customerModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// -------------------------
// Register Customer
// -------------------------
export const registerCustomer = async (req, res) => {
  try {
    const { name, email, phone, password, address, city } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Customer.findOne({ phone });
    if (exists) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      name,
      email,
      phone,
      password: hashed,
      address,
      city,
    });

    res.json({
      message: "Customer Registered",
      customer,
      token: generateToken(customer._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------------
// Login Customer
// -------------------------
export const loginCustomer = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const customer = await Customer.findOne({ phone });
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.json({
      message: "Login Successful",
      customer,
      token: generateToken(customer._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
