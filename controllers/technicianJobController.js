const Job = require("../models/jobModel");

// ✅ get assigned jobs
exports.getAssignedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      technician: req.user.id,
      status: { $in: ["pending", "accepted"] },
    })
      .populate("service", "name finalPrice")
      .populate("customer", "name phone")
      .sort({ createdAt: -1 });

    return res.json({ success: true, jobs });
  } catch (err) {
    console.error("GET ASSIGNED JOBS ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ accept job
exports.acceptJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      technician: req.user.id,
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    job.status = "accepted";
    await job.save();

    res.json({ success: true, job });
  } catch (err) {
    console.error("ACCEPT JOB ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ reject job
exports.rejectJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      technician: req.user.id,
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    job.technician = null;
    job.status = "pending";
    job.assignedAt = null;
    await job.save();

    res.json({ success: true, job });
  } catch (err) {
    console.error("REJECT JOB ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ complete job
exports.completeJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      technician: req.user.id,
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    job.status = "completed";
    await job.save();

    res.json({ success: true, job });
  } catch (err) {
    console.error("COMPLETE JOB ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
