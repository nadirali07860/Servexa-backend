const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  technicianRespond,
  updateJobStatus,
} = require("../controllers/jobController");

// Create new job
router.post("/create", createJob);

// Get all jobs
router.get("/", getJobs);

// Get single job
router.get("/:id", getJobById);

// Technician Accept / Reject
router.post("/:id/tech-respond", technicianRespond);

// Update job status
router.patch("/:id/status", updateJobStatus);

module.exports = router;
