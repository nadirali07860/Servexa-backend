const Technician = require("../models/technicianModel");

module.exports = async function autoAssign(job) {
  try {
    console.log("AUTO-ASSIGN STARTED...");

    // Find technician
    const tech = await Technician.findOne({
      isOnline: true,
      isAvailable: true,
      dailyJobLimit: { $gt: 0 }
    });

    console.log("FOUND TECH:", tech ? tech._id : null);

    if (!tech) {
      return { assigned: false };
    }

    // Assign technician
    job.technician = tech._id;
    job.status = "auto-assigned";
    await job.save();

    // Update technician
    tech.isAvailable = false;
    tech.currentJob = job._id;
    tech.dailyJobLimit -= 1;
    await tech.save();

    return { assigned: true, technician: tech };

  } catch (err) {
    console.error("AUTO-ASSIGN ERROR:", err);
    return { assigned: false };
  }
};
