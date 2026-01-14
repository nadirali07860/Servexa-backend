const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const {
  getAssignedJobs,
  acceptJob,
  rejectJob,
  completeJob,
} = require("../controllers/technicianJobController");

// 👨‍🔧 GET all assigned jobs
router.get("/", auth("technician"), getAssignedJobs);

// ✅ accept job
router.patch("/:id/accept", auth("technician"), acceptJob);

// ❌ reject job
router.patch("/:id/reject", auth("technician"), rejectJob);

// ✔ complete job
router.patch("/:id/complete", auth("technician"), completeJob);

module.exports = router;
