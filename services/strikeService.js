const Technician = require("../models/technicianModel");

async function addStrike(technicianId, reason = "Violation") {
  const tech = await Technician.findById(technicianId);
  if (!tech) return;

  tech.strikes += 1;

  if (tech.strikes >= 3) {
    tech.isBlocked = true;
    tech.blockReason = "Auto-block: 3 strikes";
  }

  await tech.save();
}

module.exports = { addStrike };
