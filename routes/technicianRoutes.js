import express from "express";
import Technician from "../models/technicianModel.js";

const router = express.Router();

// Register technician
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, skill, password } = req.body;

    const tech = await Technician.create({ name, email, phone, skill, password });

    res.json({ message: "Technician Registered", tech });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all technicians
router.get("/all", async (req, res) => {
  try {
    const technicians = await Technician.find();

    if (!technicians || technicians.length === 0) {
      return res.json({ message: "No technicians found" });
    }

    res.json(technicians);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
