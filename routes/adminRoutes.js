const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

const {
  adminAssignJob,
} = require("../controllers/adminJobController");

// admin assign job to technician
router.patch(
  "/jobs/:jobId/assign",
  auth,
  adminOnly,
  adminAssignJob
);

module.exports = router;
