const express = require("express");
const Customer = require("../models/customerModel");

const router = express.Router();

/*
===================================
   Create New Customer
===================================
*/
router.post("/create", async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name & Phone required" });
    }

    const existing = await Customer.findOne({ phone });
    if (existing) {
      return res.status(400).json({ error: "Phone already exists" });
    }

    const customer = await Customer.create(req.body);

    return res.json({ message: "Customer created", customer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
===================================
   Get All Customers
===================================
*/
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.json({ customers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
