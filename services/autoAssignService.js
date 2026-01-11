const Job = require("../models/jobModel");
const Technician = require("../models/technicianModel");

const autoAssignJob = async (jobId) => {
  // 🔒 Step 1: Job fetch with lock intent
  const job = await Job.findOne({
    _id: jobId,
    status: "pending",
  });

  if (!job) return;

  // 🔍 Step 2: Find available technician (least load)
  const technician = await Technician.findOneAndUpdate(
    {
      status: "available",
      activeJobs: { $lt: 3 },
    },
    {
      $inc: { activeJobs: 1 },
      status: "busy",
    },
    {
      sort: { activeJobs: 1 },
      new: true,
    }
  );

  // ❌ No technician available
  if (!technician) return;

  // 🔒 Step 3: Assign job ONLY if still pending
  const updatedJob = await Job.findOneAndUpdate(
    {
      _id: jobId,
      status: "pending",
    },
    {
      technician: technician._id,
      status: "assigned",
    },
    { new: true }
  );

  // ⚠️ Rollback if race condition
  if (!updatedJob) {
    await Technician.findByIdAndUpdate(technician._id, {
      $inc: { activeJobs: -1 },
      status: "available",
    });
  }
};

module.exports = autoAssignJob;
