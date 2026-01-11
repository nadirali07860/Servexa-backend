const Job = require("../models/jobModel");
const Technician = require("../models/technicianModel");

exports.autoAssignJob = async (jobId) => {
  const technician = await Technician.findOne({
    isAvailable: true,
  });

  if (!technician) {
    console.warn("⚠ No free technician available");
    return;
  }

  await Job.findByIdAndUpdate(jobId, {
    technician: technician._id,
    status: "assigned",
  });

  await Technician.findByIdAndUpdate(technician._id, {
    isAvailable: false,
    currentJob: jobId,
  });

  console.log("✅ Job auto-assigned to:", technician._id);
};
