const Job = require("../models/jobModel");
const Technician = require("../models/Technician");

// Assign nearest/available technician (basic logic)
const assignTechnician = async (req, res) => {
    try {
        const { jobId } = req.body;

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        // Find first available technician
        const technician = await Technician.findOne({ status: "available" });

        if (!technician)
            return res.status(400).json({ message: "No available technician" });

        job.technician = technician._id;
        job.status = "assigned";

        await job.save();

        res.json({
            message: "Technician assigned",
            job,
            technician
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { assignTechnician };
