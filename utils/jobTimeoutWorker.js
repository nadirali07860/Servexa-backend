const Job = require("../models/jobModel");
const Technician = require("../models/technicianModel");

const ASSIGN_TIMEOUT_MINUTES = 5;

setInterval(async () => {
  try {
    const timeoutTime = new Date(
      Date.now() - ASSIGN_TIMEOUT_MINUTES * 60 * 1000
    );

    const jobs = await Job.find({
      status: "assigned",
      assignedAt: { $lt: timeoutTime },
    });

    for (const job of jobs) {
      if (job.technician) {
        await Technician.findByIdAndUpdate(job.technician, {
          currentJob: null,
          isAvailable: true,
        });
      }

      job.status = "pending";
      job.technician = null;
      job.assignedAt = null;
      await job.save();
    }

    if (jobs.length) {
      console.log(`⏱️ ${jobs.length} job(s) auto-unassigned`);
    }
  } catch (err) {
    console.error("Job timeout worker error:", err);
  }
}, 60 * 1000); // every 1 minute
