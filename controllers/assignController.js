import Technician from "../models/Technician.js";
import Job from "../models/Job.js";

export const autoAssignTechnician = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Job find karo
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Technician find → UrbanClap style
    const tech = await Technician.findOne({
      city: job.city,
      skills: { $in: [job.serviceType] },
      availability: true
    }).sort({ activeJobs: 1 }); // kam load wala technician

    if (!tech)
      return res.status(400).json({ message: "No Technician Available" });

    // Technician assign
    job.technicianId = tech._id;
    job.status = "Assigned";
    await job.save();

    // Technician ka load update
    tech.activeJobs += 1;
    await tech.save();

    res.json({
      message: "Technician Assigned Successfully",
      technician: tech,
      job
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
