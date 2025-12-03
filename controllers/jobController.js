import Job from "../models/jobModel.js";
import Booking from "../models/bookingModel.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const { bookingId, technicianId } = req.body;

    const job = await Job.create({
      bookingId,
      technicianId,
      customerId: null,
      status: "assigned",
    });

    res.json({ message: "Job created", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Start Job
export const startJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = "in-progress";
    job.startTime = new Date();

    await job.save();

    res.json({ message: "Job started", job });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  try {
    const { jobId, workNotes, partsUsed, estimatedAmount } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.workNotes = workNotes || job.workNotes;
    job.partsUsed = partsUsed || job.partsUsed;
    job.estimatedAmount = estimatedAmount || job.estimatedAmount;

    await job.save();
    res.json({ message: "Job updated", job });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Complete Job
export const completeJob = async (req, res) => {
  try {
    const { jobId, finalAmount } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = "completed";
    job.endTime = new Date();
    job.finalAmount = finalAmount;

    await job.save();

    res.json({ message: "Job completed", job });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Technician Job List
export const getJobsByTechnician = async (req, res) => {
  try {
    const { techId } = req.params;

    const jobs = await Job.find({ technicianId: techId });

    res.json(jobs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
