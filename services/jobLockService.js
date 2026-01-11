const Job = require("../models/job");

const lockJob = async (jobId) => {
  const job = await Job.findOneAndUpdate(
    { _id: jobId, locked: false },
    { locked: true },
    { new: true }
  );

  if (!job) {
    throw new Error("Job already locked or not found");
  }

  return job;
};

module.exports = { lockJob };
