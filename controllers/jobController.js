const Job = require("../models/jobModel");
const Technician = require("../models/technicianModel");
const Customer = require("../models/customerModel");
const Service = require("../models/serviceModel");

/**
 * CUSTOMER → CREATE JOB
 */
exports.createJob = async (req, res) => {
  try {
    const customer = await Customer.findOne({ user: req.user._id });
    if (!customer) {
      return res.status(404).json({ message: "Customer profile not found" });
    }

    const { serviceId, address, note } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const job = await Job.create({
      customer: customer._id,
      service: service._id,
      price: service.finalPrice,
      address,
      note,
      status: "pending",
    });

    // AUTO ASSIGN
    const technician = await Technician.findOne({
      isAvailable: true,
      isActive: true,
    }).sort({ lastAssignedAt: 1 });

    if (technician) {
      job.technician = technician._id;
      job.status = "assigned";
      job.assignedAt = new Date();
      await job.save();

      technician.isAvailable = false;
      technician.currentJob = job._id;
      technician.lastAssignedAt = new Date();
      await technician.save();
    }

    res.json({ success: true, job });
  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * TECHNICIAN → MY JOBS
 */
exports.getTechnicianJobs = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    if (!technician) {
      return res.status(404).json({ message: "Technician profile not found" });
    }

    const jobs = await Job.find({ technician: technician._id })
      .populate("customer")
      .sort({ createdAt: -1 });

    res.json({ success: true, jobs });
  } catch (err) {
    console.error("TECH JOB ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * TECHNICIAN -> ACCEPT JOB
 */
exports.acceptJob = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
  return res.status(200).json({
    success: true,
    job: null,
  });
}

    if (String(job.technician) !== String(technician._id)) {
      return res.status(403).json({ message: "Not your job" });
    }

    job.status = "accepted";
    await job.save();

    res.json({ success: true, job });
  } catch (err) {
    console.error("ACCEPT JOB ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * TECHNICIAN -> REJECT JOB
 */
exports.rejectJob = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.rejectedBy.push(technician._id);
    job.technician = null;
    job.status = "pending";
    await job.save();

    technician.isAvailable = true;
    technician.currentJob = null;
    await technician.save();

    res.json({ success: true, job });
  } catch (err) {
    console.error("REJECT JOB ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * TECHNICIAN -> COMPLETE JOB
 */
exports.completeJob = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.status = "completed";
    await job.save();

    technician.isAvailable = true;
    technician.currentJob = null;
    await technician.save();

    res.json({ success: true, job });
  } catch (err) {
    console.error("COMPLETE JOB ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

