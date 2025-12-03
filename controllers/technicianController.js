import Technician from "../models/technicianModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerTechnician = async (req, res) => {
  try {
    const { 
      name,
      email,
      phone,
      password,
      skills,
      experience,
      city,
      address
    } = req.body;

    // Check required fields
    if (!name || !email || !phone || !password || !skills || !experience || !city || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if technician already exists
    const exists = await Technician.findOne({ phone });
    if (exists) {
      return res.status(400).json({ message: "Technician already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save technician
    const tech = await Technician.create({
      name,
      email,
      phone,
      password: hashed,
      skills,
      experience,
      city,
      address
    });

    res.json({
      message: "Technician Registered",
      technician: tech,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const loginTechnician = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const tech = await Technician.findOne({ phone });
    if (!tech)
      return res.status(400).json({ message: "Technician not found" });

    const match = await bcrypt.compare(password, tech.password);
    if (!match)
      return res.status(400).json({ message: "Invalid Credentials" });

    res.json({
      message: "Login Successful",
      technician: tech,
      token: generateToken(tech._id),
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
