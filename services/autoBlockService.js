const Technician = require("../models/technicianModel");

async function autoBlockIfNeeded(technicianId) {
  const tech = await Technician.findById(technicianId);
  if (!tech) return;

  if (tech.dailyJobs >= tech.dailyLimit) {
    tech.isBlocked = true;
    tech.blockReason = "Daily limit exceeded";
    tech.isAvailable = false;

    await tech.save();
    console.log("🚫 Technician auto-blocked:", tech._id);
  }
}

module.exports = { autoBlockIfNeeded };
