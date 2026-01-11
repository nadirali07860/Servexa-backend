const Rating = require("../models/ratingModel");
const Job = require("../models/jobModel");
const Technician = require("../models/technicianModel");

exports.submitRating = async (req, res) => {
  try {
    const { jobId, rating, review } = req.body;

    if (!jobId || !rating) {
      return res.status(400).json({ message: "JobId and rating required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your job" });
    }

    if (job.status !== "completed") {
      return res.status(400).json({ message: "Job not completed yet" });
    }

    const alreadyRated = await Rating.findOne({ job: jobId });
    if (alreadyRated) {
      return res.status(400).json({ message: "Job already rated" });
    }

    const newRating = await Rating.create({
      job: job._id,
      customer: job.customer,
      technician: job.technician,
      rating,
      review,
    });

    // ⭐ Update technician rating
    const technician = await Technician.findById(job.technician);
    if (technician) {
      const totalRating =
        technician.averageRating * technician.ratingCount + rating;

      technician.ratingCount += 1;
      technician.averageRating =
        totalRating / technician.ratingCount;

      await technician.save();
    }

    res.json({ success: true, rating: newRating });
  } catch (err) {
    console.error("Rating error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
