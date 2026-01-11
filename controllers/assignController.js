const Technician = require("../models/technicianModel");
const Job = require("../models/jobModel");

// ==========================
// AUTO ASSIGN TECHNICIAN
// ==========================
const autoAssignTechnician = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const technician = await Technician.findOne({ isBusy: false });

    if (!technician) {
      return res.status(404).json({ message: "No free technician available" });
    }

    job.technician = technician._id;
    job.status = "assigned";
    await job.save();

    technician.isBusy = true;
    await technician.save();

    res.json({
      message: "Technician auto-assigned",
      technicianId: technician._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  autoAssignTechnician,
};
