const Job = require("../models/jobModel");
const Technician = require("../models/technicianModel");

// =======================
// ACCEPT JOB
// =======================
exports.acceptJob = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });

    if (!technician) {
      return res.status(404).json({
        success: false,
        message: "Technician profile not found",
      });
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
  return res.status(200).json({
    success: true,
    job: null,
  });
}

    job.technician = technician._id;
    job.status = "assigned";
    await job.save();

    res.json({
      success: true,
      job,
    });
  } catch (err) {
    console.error("Accept job error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =======================
// COMPLETE JOB
// =======================
exports.completeJob = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });

    if (!technician) {
      return res.status(404).json({
        success: false,
        message: "Technician profile not found",
      });
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.status = "completed";
    await job.save();

    res.json({
      success: true,
      job,
    });
  } catch (err) {
    console.error("Complete job error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
