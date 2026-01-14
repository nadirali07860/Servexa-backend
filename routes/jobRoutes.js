const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createJob,
  getMyJobs,
  getJobById,
} = require("../controllers/jobController");

/*
================================
CUSTOMER CREATES JOB (AUTO ASSIGN)
================================
*/
router.post("/", auth, createJob);

/*
================================
CUSTOMER JOBS
================================
*/
router.get("/my", auth, getMyJobs);

/*
================================
GET SINGLE JOB
================================
*/
router.get("/:id", auth, getJobById);

module.exports = router;
