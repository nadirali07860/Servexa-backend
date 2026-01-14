const Job = require("../models/jobModel");
const Technician = require("../models/technicianModel");

exports.adminAssignJob = async (req, res) => {
  try {
    const { technicianId } = req.body;
    const { jobId } = req.params;

    if (!technicianId) {
      return res.status(400).json({
        success: false,
        message: "technicianId required",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const technician = await Technician.findById(technicianId);
    if (!technician || !technician.isActive) {
      return res.status(404).json({
        success: false,
        message: "Technician not available",
      });
    }

    // 🔁 If job already assigned, free old technician
    if (job.technician) {
      await Technician.findByIdAndUpdate(job.technician, {
        currentJob: null,
        isAvailable: true,
      });
    }

    // 🔗 Assign new technician
    job.technician = technician._id;
    job.status = "assigned";
    job.assignedAt = new Date();
    await job.save();

    technician.currentJob = job._id;
    technician.isAvailable = false;
    technician.lastAssignedAt = new Date();
    await technician.save();

    return res.json({
      success: true,
      message: "Job assigned by admin",
      job,
    });
  } catch (err) {
    console.error("ADMIN ASSIGN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
