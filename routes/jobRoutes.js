const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const jobController = require("../controllers/jobController");

// CUSTOMER
router.post("/create", auth("customer"), jobController.createJob);

// TECHNICIAN
router.get("/my/technician", auth("technician"), jobController.getTechnicianJobs);

// TECHNICIAN ACTIONS
router.post(
  "/:jobId/accept",
  auth("technician"),
  jobController.acceptJob
);

router.post(
  "/:jobId/reject",
  auth("technician"),
  jobController.rejectJob
);

router.post(
  "/:jobId/complete",
  auth("technician"),
  jobController.completeJob
);

module.exports = router;
