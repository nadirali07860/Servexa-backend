const express = require("express");
const router = express.Router();

const {
  createSubService,
  getSubServices
} = require("../controllers/subServiceController");

// POST
router.post("/", createSubService);

// GET
router.get("/", getSubServices);

module.exports = router;
