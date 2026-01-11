const express = require("express");
const router = express.Router();

const {
  registerTechnician,
  loginTechnician,
} = require("../controllers/technicianAuthController");

// technician register (TEMP – admin ke liye baad me shift hoga)
router.post("/register", registerTechnician);

// technician login
router.post("/login", loginTechnician);

module.exports = router;
