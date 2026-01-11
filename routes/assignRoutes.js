const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const { autoAssignTechnician } = require("../controllers/assignController");

// ==========================
// ASSIGN ROUTES
// ==========================
router.post("/", auth("admin"), autoAssignTechnician);

module.exports = router;
