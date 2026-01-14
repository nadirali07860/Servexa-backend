const express = require("express");
const router = express.Router();

const {
  createService,
  getServicesByCategory,
} = require("../controllers/serviceController");

// 🔓 PUBLIC – customer can view services
router.get(
  "/category/:categoryId",
  getServicesByCategory
);

// 🔐 ADMIN ONLY – create service
router.post(
  "/",
  createService
);

module.exports = router;
