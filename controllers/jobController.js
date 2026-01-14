const Job = require("../models/jobModel");
const Service = require("../models/serviceModel");
const Technician = require("../models/technicianModel");

/*
================================
CREATE JOB (AUTO ASSIGN)
================================
*/
exports.createJob = async (req, res) => {
  try {
    const { service, address, note } = req.body;

    if (!service || !address) {
      return res.status(400).json({
        success: false,
        message: "Service and address required",
      });
    }

    // fetch service
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // 🔥 AUTO ASSIGN: first available technician
    const technician = await Technician.findOne({
      isActive: true,
      isAvailable: true,
    }).sort({ lastAssignedAt: 1 });

    const job = await Job.create({
      customer: req.user.id,
      technician: technician ? technician._id : null,
      service: serviceDoc._id,
      address,
      note: note || "",
      price: serviceDoc.finalPrice,
      status: technician ? "assigned" : "pending",
      assignedAt: technician ? new Date() : null,
    });

    // update technician status if assigned
    if (technician) {
      technician.isAvailable = false;
      technician.lastAssignedAt = new Date();
      technician.currentJob = job._id;
      await technician.save();
    }

    return res.status(201).json({
      success: true,
      job,
    });
  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/*
================================
GET MY JOBS (CUSTOMER)
================================
*/
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ customer: req.user.id })
      .populate("service", "name finalPrice")
      .populate("technician", "name phone")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (err) {
    console.error("GET MY JOBS ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/*
================================
GET SINGLE JOB BY ID
================================
*/
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("service", "name finalPrice")
      .populate("technician", "name phone");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.json({
      success: true,
      job,
    });
  } catch (err) {
    console.error("GET JOB ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
