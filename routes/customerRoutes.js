const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const Customer = require("../models/customerModel");

const {
  registerCustomer,
  loginCustomer,
} = require("../controllers/customerController");

/* ===============================
   AUTH ROUTES
================================ */
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

/* ===============================
   GET LOGGED-IN CUSTOMER PROFILE
   GET /api/customer/me
================================ */
router.get("/me", auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      customer,
    });
  } catch (err) {
    console.error("CUSTOMER ME ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
