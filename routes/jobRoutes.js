import express from "express";
import { createJob, startJob, updateJob, completeJob, getJobsByTechnician } from "../controllers/jobController.js";

const router = express.Router();

// CREATE new job after booking assigned
router.post("/create", createJob);

// Technician reached → start job
router.post("/start", startJob);

// Update job progress (notes, parts, estimate)
router.post("/update", updateJob);

// Complete job with final amount
router.post("/complete", completeJob);

// Technician job list
router.get("/technician/:techId", getJobsByTechnician);

export default router;
