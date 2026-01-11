const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

// ✅ correct controller import
const {
  getTechnicianProfile,
  updateTechnicianProfile,
} = require("../controllers/technicianController");

// ==========================
// TECHNICIAN ROUTES
// ==========================

// profile
router.get("/profile", auth("technician"), getTechnicianProfile);
router.put("/profile", auth("technician"), updateTechnicianProfile);

module.exports = router;
