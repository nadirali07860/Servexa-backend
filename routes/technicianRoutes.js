const express = require("express");
const router = express.Router();
const Technician = require("../models/technicianModel");

// =========================
// Create Technician
// =========================
router.post("/create", async (req, res) => {
  try {
    const tech = await Technician.create(req.body);
    res.json({ message: "Technician created", tech });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Get All Technicians
// =========================
router.get("/", async (req, res) => {
  try {
    const technicians = await Technician.find();
    res.json({ technicians });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Update Technician (NEW)
// =========================
router.put("/update/:id", async (req, res) => {
  try {
    const tech = await Technician.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!tech) {
      return res.status(404).json({ error: "Technician not found" });
    }

    res.json({ message: "Technician updated", tech });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Delete Technician (Optional)
// =========================
router.delete("/delete/:id", async (req, res) => {
  try {
    const tech = await Technician.findByIdAndDelete(req.params.id);
    if (!tech) {
      return res.status(404).json({ error: "Technician not found" });
    }
    res.json({ message: "Technician deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
