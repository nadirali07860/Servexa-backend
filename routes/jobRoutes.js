import express from "express";
import {
  createJob,
  updateJobStatus,
  getTechnicianJobs,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/create", createJob);
router.post("/update-status", updateJobStatus);
router.get("/technician/:techId", getTechnicianJobs);

export default router;
