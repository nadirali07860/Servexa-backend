const express = require("express");
const router = express.Router();
const SubService = require("../models/subServiceModel");

// Get all sub-services
router.get("/", async (req, res) => {
  try {
    const items = await SubService.find();
    res.json({ subServices: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
