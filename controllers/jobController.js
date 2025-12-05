import Job from "../models/jobModel.js";
import Technician from "../models/technicianModel.js";
import Booking from "../models/bookingModel.js";

// ---------------------------------------
// 1. Create Job (After Booking)
// ---------------------------------------
export const createJob = async (req, res) => {
    try {
        const { bookingId, technicianId } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        const tech = await Technician.findById(technicianId);
        if (!tech) return res.status(404).json({ message: "Technician not found" });

        // ⭐ Fix: customerId added from booking
        const customerId = booking.customer;

        const job = await Job.create({
            customerId: customerId,
            technicianId: technicianId,
            bookingId: bookingId,
            status: "assigned",
        });

        res.json({ message: "Job Created", job });
    } catch (error) {
        res.status(500).json({ message: "Error creating job", error });
    }
};

// ---------------------------------------
// 2. Update Job Status
// ---------------------------------------
export const updateJobStatus = async (req, res) => {
    try {
        const { jobId, status } = req.body;

        const allowed = ["in-progress", "completed", "cancelled"];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        job.status = status;
        await job.save();

        res.json({ message: "Status Updated", job });
    } catch (error) {
        res.status(500).json({ message: "Error updating job", error });
    }
};

// ---------------------------------------
// 3. All Jobs for Technician
// ---------------------------------------
export const getTechnicianJobs = async (req, res) => {
  try {
    const { techId } = req.params;

    const jobs = await Job.find({ technicianId: techId })
      .populate("bookingId")
      .populate("technicianId", "name phone skill");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

export default {
    createJob,
    updateJobStatus,
    getTechnicianJobs
};
