const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const { createService } = require("../controllers/serviceController");

// ==============================
// ADMIN → CREATE SERVICE
// ==============================
router.post(
  "/",
  auth("admin"),
  createService
);

module.exports = router;
