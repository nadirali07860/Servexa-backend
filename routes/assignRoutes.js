const express = require("express");
const router = express.Router();

const { assignTechnician } = require("../controllers/assignController");
const auth = require("../middleware/authMiddleware");

router.post("/assign", auth, assignTechnician);

module.exports = router;
