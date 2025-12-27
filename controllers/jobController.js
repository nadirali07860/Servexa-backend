const Job = require("../models/jobModel");
const Customer = require("../models/customerModel");
const Technician = require("../models/technicianModel");
const autoAssign = require("../utils/autoAssign");
const mongoose = require("mongoose");

// ------------------------------
// Create Job + Auto Assign
// ------------------------------
exports.createJob = async (req, res) => {
  try {

    // Convert string IDs → ObjectId
    if (req.body.customer) {
      req.body.customer = new mongoose.Types.ObjectId(req.body.customer);
    }
    if (req.body.category) {
      req.body.category = new mongoose.Types.ObjectId(req.body.category);
    }
    if (req.body.service) {
      req.body.service = new mongoose.Types.ObjectId(req.body.service);
    }
    if (req.body.subService) {
      req.body.subService = new mongoose.Types.ObjectId(req.body.subService);
    }

    const job = new Job(req.body);

    if (!job.customer) {
      return res.status(400).json({ error: "Customer id is required" });
    }

    // Auto assign technician
    const result = await autoAssign(job);

    if (!result.assigned) {
      await job.save();
      return res.json({
        message: "Job created but no technician available",
        autoAssigned: false,
        job,
      });
    }

    return res.json({
      message: "Job created",
      autoAssigned: true,
      job,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// GET ALL JOBS (Admin)
// ------------------------------
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("customer", "name phone")
      .populate("technician", "name phone")
      .populate("category", "name")
      .populate("service", "name")
      .populate("subService", "name");

    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// GET SINGLE JOB
// ------------------------------
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("customer", "name phone")
      .populate("technician", "name phone")
      .populate("category", "name")
      .populate("service", "name")
      .populate("subService", "name");

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json({ job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// Technician Accept / Reject
// ------------------------------
exports.technicianRespond = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { decision } = req.body;

    const job = await Job.findById(jobId).populate("technician");
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (!job.technician)
      return res.status(400).json({ error: "No technician assigned yet" });

    // ACCEPT
    if (decision === "accept") {
      job.status = "accepted";
      job.technicianMaskedPhone =
        "xxxxxx" + job.technician.phone.slice(-4);
      await job.save();

      await Technician.findByIdAndUpdate(job.technician._id, {
        isAvailable: false,
        currentJob: job._id,
      });

      return res.json({ message: "Job accepted", job });
    }

    // REJECT
    if (decision === "reject") {
      const previousTech = job.technician?._id;

      job.status = "auto-assigned";
      job.technician = null;
      job.technicianMaskedPhone = "";
      job.autoAssignAttempts += 1;

      await job.save();

      if (previousTech) {
        await Technician.findByIdAndUpdate(previousTech, {
          isAvailable: true,
          currentJob: null,
        });
      }

      const result = await autoAssign(job);

      return res.json({
        message: "Technician rejected job",
        reAssigned: result.assigned,
        job,
      });
    }

    return res.status(400).json({ error: "Invalid decision" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// Update Job Status
// ------------------------------
exports.updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    job.status = req.body.status;
    await job.save();

    res.json({ message: "Job status updated", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
