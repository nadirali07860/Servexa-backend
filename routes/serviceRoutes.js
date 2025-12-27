const express = require("express");
const router = express.Router();
const {
  createService,
  getServices
} = require("../controllers/serviceController");

// Create new service
router.post("/create", createService);

// Get all services
router.get("/", getServices);

module.exports = router;
